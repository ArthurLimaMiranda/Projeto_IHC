"use client";
import { useState } from "react";
import {
  Bars3Icon,
  BellIcon,
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


// Helpers --------------------------------------------------------------
const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]; // Domingo → Sábado

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

// Main Component --------------------------------------------------------
export default function AgendaPage() {
  const router = useRouter(); 

  const [selectedView, setSelectedView] = useState("Semana");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // 2025
  const [selectedDay, setSelectedDay] = useState(new Date(2025, 0, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const matrix = getMonthMatrix(year, month);

  function handlePrevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function handleNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  // Example events ------------------------------------------------------
  const events = [
    {
      date: "2025-01-05",
      title: "Bolo Casamento - Ana",
      status: "pending",
      time: "14:00 - 15:00",
    },
    {
      date: "2025-01-05",
      title: "Kit Festa Infantil",
      status: "completed",
      time: "09:00 - 10:00",
    },
    {
      date: "2025-01-05",
      title: "Folga",
      status: "block",
      time: "Dia inteiro",
    },
  ];

  const todayEvents = events.filter(
    (e) => e.date === selectedDay.toISOString().split("T")[0]
  );

  return (
    <div className="min-h-screen w-full bg-[#FFFFF4]">
      {/* Top App Bar */}
        <div className="sticky top-0 z-10 flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between">
            <div className="flex size-12 items-center">
                <button
                onClick={() => router.back()}
                className="text-[#4F2712] h-12"
                >
                <ArrowLeftIcon className="w-8 h-8 text-[#4F2712]" />
                </button>
        </div>
        <h2 className="text-[#4F2712] text-lg font-bold flex-1 text-center">
        Minha Agenda
        </h2>

        <div className="flex w-12 items-center justify-end">
          <button className="h-12 text-primary text-[#4F2712]">
            <BellIcon className="w-8 h-8 text-[#4F2712]" />
          </button>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex px-4 py-3 pt-6 pb-4">
        <div className="flex h-10 flex-1 items-center justify-center rounded-md bg-[#edebdd] p-1">
          {["Dia", "Semana", "Mês"].map((view) => (
            <label
              key={view}
              className={`flex cursor-pointer h-full grow items-center justify-center rounded-md px-2 text-sm font-medium ${
                selectedView === view ? "bg-[#4F2712] text-white shadow-md" : "text-[#4F2712]"
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

      {/* Calendar Picker */}
      <div className="flex flex-wrap items-center justify-center gap-6 px-4">
        <div className="flex min-w-full max-w-full flex-col gap-0.5">
          <div className="flex items-center p-1 justify-between text-[#4F2712]">
            <button className="text-primary text-[#4F2712]" onClick={handlePrevMonth}>
              <ChevronLeftIcon className="w-8 h-8 text-[#4F2712]" />
            </button>

            <p className="text-[#4F2712] text-base font-bold text-center flex-1">
            {monthNames[month]} {year}
            </p>

            <button className="text-primary" onClick={handleNextMonth}>
              <ChevronRightIcon className="w-8 h-8 text-[#4F2712]" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 text-primary text-[#B95760]">
            {weekDays.map((d) => (
              <p
                key={d}
                className="text-[13px] font-bold flex h-12 w-full items-center justify-center text-[#B95760]"
              >
                {d}
              </p>
            ))}

            {/* Dates */}
            {matrix.map((d, i) => {
              const dateObj = new Date(year, month + (d.dim ? (i < 7 ? -1 : 1) : 0), d.num);
              const iso = dateObj.toISOString().split("T")[0];
              const hasEvent = events.some((e) => e.date === iso);
              const isSelected =
                selectedDay.toISOString().split("T")[0] === iso;

              return (
                <button
                  key={i}
                  className={`relative h-12 w-full text-sm font-medium ${
                    d.dim ? "text-primary/50" : "text-primary"
                  }`}
                  onClick={() => setSelectedDay(dateObj)}
                >
                  <div
                    className={`flex size-full items-center justify-center rounded-full ${
                      isSelected ? "bg-[#4F2712] text-white" : "text-[#4F2712]"
                    }`}
                  >
                    {d.num}
                  </div>
                  {hasEvent && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-event-pending"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend and Events */}
      <div className="flex flex-col gap-4 p-4 mt-2">
        <div className="flex items-center justify-center gap-4 text-xs text-primary/80">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-event-pending"></div>
            <span className="text-[#B95760] text-lg">Pendente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-event-completed"></div>
            <span className="text-[#B95760] text-lg">Entregue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-event-block"></div>
            <span className="text-[#B95760] text-lg">Bloqueio</span>
          </div>
        </div>

        <hr className="border-primary/10" />

        <h3 className="text-base font-bold text-[#4F2712]">
          Eventos do dia {selectedDay.getDate()}
        </h3>

        <div className="flex flex-col gap-3">
          {todayEvents.length === 0 && (
            <p className="text-[#4F2712] text-sm">Nenhum evento.</p>
          )}

          {todayEvents.map((event, idx) => (
            <div className="flex items-center gap-4 min-h-14" key={idx}>
              <div
                className={`flex items-center justify-center size-10 rounded-lg ${
                  event.status === "pending"
                    ? "bg-event-pending/20 text-event-pending"
                    : event.status === "completed"
                    ? "bg-event-completed/20 text-event-completed"
                    : "bg-event-block/20 text-event-block"
                }`}
              >
                {event.status === "pending" && (
                  <ClockIcon className="w-6 h-6" />
                )}
                {event.status === "completed" && (
                  <CheckCircleIcon className="w-6 h-6" />
                )}
                {event.status === "block" && (
                  <StopIcon className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-primary text-base font-medium">{event.title}</p>
                <p className="text-sm text-primary/70">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 pb-14">
        <button className="flex items-center justify-center size-14 bg-primary text-white rounded-2xl shadow-lg">
          <PlusIcon className="w-10 h-10" />
        </button>
      </div>
      < MenuInferior/>
    </div>
  );
}
