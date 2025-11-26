"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  StopIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/solid";
import MenuInferior from "@/components/Admin/MenuInferior";
import { useRouter } from "next/navigation";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useCart, Order } from "@/contexts/CartContext";

// ----------------------------------------------------------------------
// CONSTANTES
// ----------------------------------------------------------------------

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const monthNames = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

// ----------------------------------------------------------------------
// TIPOS E INTERFACES
// ----------------------------------------------------------------------

interface AgendaEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: string;
  time: string;
  order: Order;
  customerName: string;
  address: string;
  phone: string;
  total: number;
}

// ----------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const matrix: Array<{ num: number; dim: boolean }> = [];
  let dayCount = 1;
  let nextMonthDay = 1;

  for (let i = 0; i < 42; i++) {
    if (i < firstDay) {
      matrix.push({ num: prevMonthDays - (firstDay - 1 - i), dim: true });
    } else if (dayCount <= daysInMonth) {
      matrix.push({ num: dayCount, dim: false });
      dayCount++;
    } else {
      matrix.push({ num: nextMonthDay, dim: true });
      nextMonthDay++;
    }
  }
  return matrix;
}

function getWeekDates(selectedDay: Date) {
  const week: Date[] = [];
  const day = new Date(selectedDay);
  const weekday = day.getDay();

  day.setDate(day.getDate() - weekday);

  for (let i = 0; i < 7; i++) {
    week.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  return week;
}

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------

export default function AgendaPage() {
  const router = useRouter();
  const { 
    getAllOrders, 
    getOrdersByDeliveryDate, 
    updateOrderDeliveryDate,
    getTodayOrders 
  } = useCart();

  // ➤ Agora inicia sempre em "Mês"
  const [selectedView, setSelectedView] = useState("Mês");

  // ➤ Pega o mês atual automaticamente
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  // ➤ Dia selecionado começa no dia atual
  const [selectedDay, setSelectedDay] = useState(today);

  // ➤ Eventos reais dos pedidos
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [todayEvents, setTodayEvents] = useState<AgendaEvent[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const matrix = getMonthMatrix(year, month);
  const weekDates = getWeekDates(selectedDay);

  // ----------------------------------------------------------------------
  // CARREGAR EVENTOS REAIS
  // ----------------------------------------------------------------------

  useEffect(() => {
    const loadEvents = () => {
      try {
        const orders = getAllOrders();
        
        // Transformar pedidos em eventos para a agenda
        const eventsFromOrders: AgendaEvent[] = orders.map(order => {
          const deliveryDate = new Date(order.estimatedDelivery);
          const dateKey = deliveryDate.toISOString().split("T")[0];
          
          return {
            id: order.id,
            date: dateKey,
            title: `Pedido ${order.id} - ${order.customer.name}`,
            description: order.items.map(item => item.name).join(', '),
            status: getEventStatus(order.status),
            time: deliveryDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            order: order,
            customerName: order.customer.name,
            address: order.customer.address,
            phone: order.customer.phone,
            total: order.total
          };
        });

        setEvents(eventsFromOrders);

        // Carregar eventos do dia selecionado
        const selectedDateKey = selectedDay.toISOString().split("T")[0];
        const eventsForSelectedDay = eventsFromOrders.filter(
          event => event.date === selectedDateKey
        );
        setTodayEvents(eventsForSelectedDay);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    loadEvents();
    
    // Atualizar quando houver mudanças no localStorage
    const handleStorageChange = () => loadEvents();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [getAllOrders, selectedDay]);

  const getEventStatus = (orderStatus: Order['status']): string => {
    switch (orderStatus) {
      case 'PENDING': return "pending";
      case 'PREPARING': return "pending";
      case 'OUT_FOR_DELIVERY': return "pending";
      case 'DELIVERED': return "completed";
      default: return "pending";
    }
  };

  const getStatusColor = (status: Order['status']): string => {
    switch (status) {
      case 'PENDING': return 'bg-orange-500';
      case 'PREPARING': return 'bg-yellow-500';
      case 'OUT_FOR_DELIVERY': return 'bg-blue-500';
      case 'DELIVERED': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Order['status']): string => {
    switch (status) {
      case 'PENDING': return 'Pendente';
      case 'PREPARING': return 'Em Produção';
      case 'OUT_FOR_DELIVERY': return 'Saiu para Entrega';
      case 'DELIVERED': return 'Entregue';
      default: return status;
    }
  };

  // ----------------------------------------------------------------------
  // NAVEGAÇÃO
  // ----------------------------------------------------------------------

  function handlePrev() {
    if (selectedView === "Semana") {
      const newDate = new Date(selectedDay);
      newDate.setDate(selectedDay.getDate() - 7);
      setSelectedDay(newDate);
    } else if (selectedView === "Mês") {
      setCurrentDate(new Date(year, month - 1, 1));
    } else {
      setCurrentDate(new Date(year - 1, 0, 1));
    }
  }

  function handleNext() {
    if (selectedView === "Semana") {
      const newDate = new Date(selectedDay);
      newDate.setDate(selectedDay.getDate() + 7);
      setSelectedDay(newDate);
    } else if (selectedView === "Mês") {
      setCurrentDate(new Date(year, month + 1, 1));
    } else {
      setCurrentDate(new Date(year + 1, 0, 1));
    }
  }

  // ----------------------------------------------------------------------
  // FUNÇÕES PARA ATUALIZAR DATAS
  // ----------------------------------------------------------------------

  const handleDateChange = (orderId: string, newDate: string) => {
    const success = updateOrderDeliveryDate(orderId, newDate);
    if (success) {
      // A atualização será refletida automaticamente pelo event listener
    }
  };

  // ----------------------------------------------------------------------
  // VISUALIZAÇÕES
  // ----------------------------------------------------------------------

  function renderWeekView() {
    return (
      <>
        <div className="grid grid-cols-7 text-center text-[#B95760] text-sm font-bold mb-1">
          {weekDays.map((d) => <span key={d}>{d}</span>)}
        </div>

        <div className="grid grid-cols-7">
          {weekDates.map((date, i) => {
            const iso = date.toISOString().split("T")[0];
            const dayEvents = events.filter((e) => e.date === iso);
            const hasEvent = dayEvents.length > 0;
            const isSelected = selectedDay.toDateString() === date.toDateString();

            return (
              <button
                key={i}
                onClick={() => setSelectedDay(new Date(date))}
                className="relative flex items-center justify-center h-14"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${
                    isSelected ? "bg-[#4F2712] text-white" : "text-[#4F2712]"
                  }`}
                >
                  {date.getDate()}
                </div>

                {hasEvent && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-event-pending rounded-full"></span>
                )}
                
                {/* Mostrar quantidade de eventos */}
                {dayEvents.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#B95760] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {dayEvents.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </>
    );
  }

  function renderMonthView() {
    return (
      <>
        <div className="grid grid-cols-7 text-center text-[#B95760] text-sm font-bold mb-1">
          {weekDays.map((d) => <span key={d}>{d}</span>)}
        </div>

        <div className="grid grid-cols-7">
          {matrix.map((d, i) => {
            const dateObj = new Date(
              year,
              month + (d.dim ? (i < 7 ? -1 : 1) : 0),
              d.num
            );
            const iso = dateObj.toISOString().split("T")[0];
            const dayEvents = events.filter((e) => e.date === iso);
            const hasEvent = dayEvents.length > 0;

            const isSelected = selectedDay.toDateString() === dateObj.toDateString();

            return (
              <button
                key={i}
                onClick={() => setSelectedDay(dateObj)}
                className="relative h-12 flex items-center justify-center text-sm"
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    isSelected
                      ? "bg-[#4F2712] text-white"
                      : d.dim
                      ? "text-[#00000040]"
                      : "text-[#4F2712]"
                  }`}
                >
                  {d.num}
                </div>

                {hasEvent && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-event-pending rounded-full"></span>
                )}
                
                {/* Mostrar quantidade de eventos */}
                {dayEvents.length > 0 && (
                  <span className="absolute top-0 right-0 bg-[#B95760] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
                    {dayEvents.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </>
    );
  }

  function renderYearView() {
    return (
      <div className="grid grid-cols-1 gap-6 px-4 pb-2">
        {Array.from({ length: 12 }).map((_, monthIndex) => {
          const monthMatrix = getMonthMatrix(year, monthIndex);

          return (
            <div key={monthIndex} className="bg-[#EEE3CC] rounded-xl p-3 shadow-sm">
              <h2 className="text-[#4F2712] text-lg font-bold text-center mb-2">
                {monthNames[monthIndex]}
              </h2>

              <div className="grid grid-cols-7 text-[11px] text-[#B95760] font-bold mb-1">
                {weekDays.map((d) => (
                  <span key={d} className="text-center">{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-[11px]">
                {monthMatrix.map((d, i) => {
                  const dateObj = new Date(
                    year,
                    monthIndex + (d.dim ? (i < 7 ? -1 : 1) : 0),
                    d.num
                  );
                  const iso = dateObj.toISOString().split("T")[0];
                  const dayEvents = events.filter((e) => e.date === iso);
                  const hasEvent = dayEvents.length > 0;

                  const isSelected =
                    selectedDay.toDateString() === dateObj.toDateString();

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedDay(dateObj);
                        setCurrentDate(new Date(year, monthIndex, 1));
                        setSelectedView("Mês");
                      }}
                      className={`relative flex items-center justify-center h-7 rounded-full ${
                        isSelected
                          ? "bg-[#4F2712] text-white"
                          : d.dim
                          ? "text-[#4F271250]"
                          : "text-[#4F2712]"
                      }`}
                    >
                      {d.num}

                      {hasEvent && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-event-pending rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#FFFFF4] pb-24">

      {/* HEADER */}
      <header className="flex items-center bg-[#EEEDDF] p-4 justify-between sticky top-0 z-10">
        <ArrowLeftIcon 
          className="w-7 h-7 text-[#4F2712] cursor-pointer" 
          onClick={() => router.back()} 
        />
        <h1 className="text-lg font-bold text-[#4F2712]">Agenda de Entregas</h1>
        <QuestionMarkCircleIcon className="w-7 h-7 text-[#4F2712]" />
      </header>

      {/* VIEW SELECTOR */}
      <div className="flex px-4 py-3 pt-6 pb-4">
        <div className="flex h-10 flex-1 items-center justify-center rounded-md bg-[#edebdd] p-1">
          {["Semana", "Mês", "Ano"].map((view) => (
            <label
              key={view}
              className={`flex cursor-pointer h-full grow items-center justify-center rounded-md px-2 text-sm font-medium ${
                selectedView === view ? "bg-[#4F2712] text-white" : "text-[#4F2712]"
              }`}
            >
              <span>{view}</span>
              <input
                type="radio"
                className="hidden"
                checked={selectedView === view}
                onChange={() => setSelectedView(view)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex items-center justify-between px-6 text-[#4F2712] font-bold text-lg">
        <ChevronLeftIcon className="w-7 h-7 cursor-pointer" onClick={handlePrev} />
        <p>
          {selectedView === "Semana" &&
            `Semana de ${selectedDay.getDate()} ${monthNames[selectedDay.getMonth()]}`}
          {selectedView === "Mês" &&
            `${monthNames[month]} ${year}`}
          {selectedView === "Ano" &&
            `${year}`}
        </p>
        <ChevronRightIcon className="w-7 h-7 cursor-pointer" onClick={handleNext} />
      </div>

      {/* VIEWS */}
      <div className="p-4">
        {selectedView === "Semana" && renderWeekView()}
        {selectedView === "Mês" && renderMonthView()}
        {selectedView === "Ano" && renderYearView()}
      </div>

      {/* EVENTOS DO DIA */}
      <div className="px-5 mt-3">
        <h3 className="text-base font-bold text-[#4F2712] mb-3">
          Entregas para {selectedDay.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h3>

        {todayEvents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ClockIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>Nenhuma entrega para esta data</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {todayEvents.map((event, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/historico-pedidos/${event.id}`)}
            >

              <div
                className={`flex items-center justify-center size-12 rounded-lg ${
                  event.status === "pending"
                    ? "bg-orange-100 text-orange-600 border border-orange-200"
                    : event.status === "completed"
                    ? "bg-green-100 text-green-600 border border-green-200"
                    : "bg-red-100 text-red-600 border border-red-200"
                }`}
              >
                {event.status === "pending" && <ClockIcon className="w-6 h-6" />}
                {event.status === "completed" && <CheckCircleIcon className="w-6 h-6" />}
                {event.status === "block" && <StopIcon className="w-6 h-6" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-[#B95760] text-sm truncate">
                    {event.title}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                    {event.time}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 truncate mb-1">
                  {event.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>📞 {event.phone}</span>
                  <span>•</span>
                  <span className="font-medium text-[#4F2712]">
                    R$ {event.total.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full text-white ${
                    getStatusColor(event.order.status)
                  }`}>
                    {getStatusText(event.order.status)}
                  </span>
                  
                  {/* Input para alterar data/hora */}
                  <input
                    type="datetime-local"
                    defaultValue={event.order.estimatedDelivery.slice(0, 16)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleDateChange(event.id, e.target.value);
                    }}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MenuInferior />
    </div>
  );
}