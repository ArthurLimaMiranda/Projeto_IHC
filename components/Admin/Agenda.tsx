"use client";
import { useState } from "react";
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


// ----------------------------------------------------------------------
// CONSTANTES
// ----------------------------------------------------------------------

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const monthNames = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

// ----------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const matrix = [];
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

function getWeekDates(selectedDay) {
  const week = [];
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

  // ➤ Agora inicia sempre em "Mês"
  const [selectedView, setSelectedView] = useState("Mês");

  // ➤ Pega o mês atual automaticamente
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  // ➤ Dia selecionado começa no dia atual
  const [selectedDay, setSelectedDay] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const matrix = getMonthMatrix(year, month);
  const weekDates = getWeekDates(selectedDay);

  // ----------------------------------------------------------------------
  // EVENTOS DE EXEMPLO
  // ----------------------------------------------------------------------

  const events = [
    { date: "2025-01-05", title: "Bolo Casamento", status: "pending", time: "14:00" },
    { date: "2025-01-05", title: "Kit Festa Infantil", status: "completed", time: "09:00" },
    { date: "2025-01-10", title: "Folga", status: "block", time: "Dia inteiro" },
    { date: "2025-01-18", title: "Encomenda Brownie", status: "pending", time: "11:00" }
  ];

  const todayEvents = events.filter(
    (e) => e.date === selectedDay.toISOString().split("T")[0]
  );

  // ----------------------------------------------------------------------
  // NAVEGAÇÃO
  // ----------------------------------------------------------------------

  function handlePrev() {
    if (selectedView === "Semana") {
      setSelectedDay(new Date(selectedDay.setDate(selectedDay.getDate() - 7)));
    } else if (selectedView === "Mês") {
      setCurrentDate(new Date(year, month - 1, 1));
    } else {
      setCurrentDate(new Date(year - 1, 0, 1));
    }
  }

  function handleNext() {
    if (selectedView === "Semana") {
      setSelectedDay(new Date(selectedDay.setDate(selectedDay.getDate() + 7)));
    } else if (selectedView === "Mês") {
      setCurrentDate(new Date(year, month + 1, 1));
    } else {
      setCurrentDate(new Date(year + 1, 0, 1));
    }
  }

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
            const hasEvent = events.some((e) => e.date === iso);
            const isSelected =
              selectedDay.toDateString() === date.toDateString();

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
            const hasEvent = events.some((e) => e.date === iso);

            const isSelected =
              selectedDay.toDateString() === dateObj.toDateString();

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
                  const hasEvent = events.some((e) => e.date === iso);

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
        <ArrowLeftIcon className="w-7 h-7 text-[#4F2712] cursor-pointer" onClick={() => router.back()} />
        <h1 className="text-lg font-bold text-[#4F2712]">Minha Agenda</h1>
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
          Eventos do dia {selectedDay.getDate()}
        </h3>

        {todayEvents.length === 0 && (
          <p className="text-sm text-[#4F2712]">Nenhum evento.</p>
        )}

        <div className="flex flex-col gap-3">
          {todayEvents.map((event, i) => (
            <div key={i} className="flex items-center gap-4 bg-[#EEE] p-3 rounded-xl">

              <div
                className={`flex items-center justify-center size-10 rounded-lg ${
                  event.status === "pending"
                    ? "bg-event-pending/20 text-event-pending"
                    : event.status === "completed"
                    ? "bg-event-completed/20 text-event-completed"
                    : "bg-event-block/20 text-event-block"
                }`}
              >
                {event.status === "pending" && <ClockIcon className="w-6 h-6" />}
                {event.status === "completed" && <CheckCircleIcon className="w-6 h-6" />}
                {event.status === "block" && <StopIcon className="w-6 h-6" />}
              </div>

              <div className="flex-1">
                <p className="text-[#4F2712] text-base font-medium">{event.title}</p>
                <p className="text-sm text-[#4F2712]/70">{event.time}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 pb-16">
        <button className="flex items-center justify-center size-14 bg-primary text-white rounded-2xl shadow-lg">
          <PlusIcon className="w-10 h-10" />
        </button>
      </div>

      <MenuInferior />
    </div>
  );
}
