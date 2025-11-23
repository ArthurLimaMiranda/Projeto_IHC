"use client"

import { useState } from "react";
import { ArrowLeftIcon, Bars3Icon, BellIcon, CalendarIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MenuInferior from "./MenuInferior";

export default function DashboardFinanceiro() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#FFFFF4] text-primary">
      {/* Header */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon className="w-7 h-7 cursor-pointer text-[#4F2712]"
          onClick={() => router.back()} />
        </div>

        <h1 className="text-text-main text-lg font-bold flex-1 text-center text-[#4F2712]">
          Resumo Financeiro
        </h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main">
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pb-24">
        {/* Filtros */}
        <div className="p-4 pt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              "Este Mês",
              "Últimos 30 dias",
              "Este Ano",
              "Personalizado",
            ].map((label, i) => (
              <button
                key={i}
                className={`flex h-9 items-center justify-center gap-x-2 rounded-full px-4 pr-3 shrink-0 text-sm font-medium ${
                  i === 0
                    ? "bg-[#4F2712] text-white"
                    : "bg-[#EEEDDF] text-[#4F2712]"
                }`}
              >
                {label}
                {label === "Personalizado" && (
                  <CalendarIcon className="w-4 h-4 ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="flex flex-wrap gap-4 p-4">
          <ResumoCard titulo="Receita Bruta Total" valor="R$ 8.540,00" variacao="+15%" variacaoColor="text-accent-1" />
          <ResumoCard titulo="Despesas Totais" valor="R$ 3.120,00" variacao="+5%" variacaoColor="text-secondary" />
          <ResumoCard titulo="Lucro Líquido" valor="R$ 5.420,00" variacao="+22%" variacaoColor="text-accent-1" full />
        </div>

        {/* Gráfico Receitas vs Despesas */}
        <section className="flex flex-col gap-4 border rounded-xl mx-4 p-5 bg-white border-[#B95760] ">
          <div className="flex items-center justify-between">
            <p className="font-bold">Receitas vs. Despesas</p>
            <div className="flex gap-4 text-xs">
              <Legenda cor="bg-accent-1" label="Receitas" />
              <Legenda cor="bg-secondary" label="Despesas" />
            </div>
          </div>

          <GraficoBarras />
        </section>

        {/* Gráfico Evolução do Lucro */}
        <section className="flex flex-col gap-4 border rounded-xl mx-4 mt-4 p-5 bg-white dark:bg-background-dark/20 border-primary/10 dark:border-white/10">
          <p className="font-bold">Evolução do Lucro</p>
          <GraficoLinha />
        </section>

        {/* Aviso */}
        <div className="px-4 py-2">
          <div className="rounded-xl bg-accent-2/30 dark:bg-accent-2/20 p-4 text-center">
            <p>Seu lucro este mês aumentou 22% em comparação com o mês passado.</p>
          </div>
        </div>
      </main>

      {/* Botão flutuante */}
      <div className="fixed bottom-6 right-6 z-20">
        <button className="h-14 w-14 flex items-center justify-center rounded-full bg-primary text-white shadow-lg">
          <PlusIcon className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

// Componentes auxiliares
function ResumoCard({ titulo, valor, variacao, variacaoColor, full }: any) {
  return (
    <div className={`flex flex-col gap-2 rounded-xl shadow-sm p-5 bg-white border-[#B95760] ${full ? "w-full" : "flex-1 min-w-[158px]"}`}>
      <p className="text-primary/80 dark:text-gray-300 text-base font-medium">{titulo}</p>
      <p className="text-2xl font-bold text-primary dark:text-gray-100">{valor}</p>
      <p className={`text-base font-medium ${variacaoColor}`}>{variacao}</p>
    </div>
  );
}

function Legenda({ cor, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`size-3 rounded-full ${cor}`} />
      <span className="text-primary/80 dark:text-gray-300 font-medium">{label}</span>
    </div>
  );
}

// Mock gráfico de barras
function GraficoBarras() {
  const dados = [
    { receita: 80, despesa: 30, label: "Sem 1" },
    { receita: 70, despesa: 40, label: "Sem 2" },
    { receita: 50, despesa: 60, label: "Sem 3" },
    { receita: 90, despesa: 25, label: "Sem 4" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 items-end justify-items-center min-h-[180px]">
      {dados.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="relative flex h-32 w-4 items-end">
            <div
              className="absolute bottom-0 w-full rounded-t-full bg-accent-1"
              style={{ height: `${d.receita}%` }}
            />
            <div
              className="absolute bottom-0 w-full rounded-t-full bg-secondary"
              style={{ height: `${d.despesa}%` }}
            />
          </div>
          <p className="text-xs font-bold text-primary/70 dark:text-gray-400">{d.label}</p>
        </div>
      ))}
    </div>
  );
}

// Mock gráfico de linha SVG
function GraficoLinha() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <svg
        fill="none"
        height="148"
        preserveAspectRatio="none"
        viewBox="-3 0 478 150"
        width="100%"
      >
        <path
          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
          fill="url(#gradient)"
        />

        <path
          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
          stroke="#34A7B2"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="gradient" x1="236" x2="236" y1="1" y2="149" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9DEBF7" />
            <stop offset="1" stopColor="#B2FFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex justify-around text-xs font-bold text-primary/70 dark:text-gray-400">
        <p>Sem 1</p>
        <p>Sem 2</p>
        <p>Sem 3</p>
        <p>Sem 4</p>
      </div>
      <MenuInferior />
    </div>
  );
}
