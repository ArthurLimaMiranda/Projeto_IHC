"use client";

import React from "react";
import {
  ArrowLeftIcon,
  PlusIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowUpIcon,
  ReceiptRefundIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  ClockIcon,
  Squares2X2Icon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";
import MenuInferior from "@/components/Admin/MenuInferior";

export default function FinancasPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#FFFFF4]">
      {/* Top App Bar */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon className="w-7 h-7" />
        </div>

        <h1 className="text-text-main text-lg font-bold flex-1 text-center text-[#4F2712]">
          Finanças
        </h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main">
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 pt-4 pb-8">
        {/* Quick Actions */}
        <section className="flex flex-col gap-3">
          <button className="flex w-full h-14 items-center justify-center gap-3 rounded-lg bg-primary px-5 text-white font-bold">
            <PlusIcon className="w-6 h-6" />
            <span className="truncate text-white">Registrar Nova Despesa</span>
          </button>

          <div className="flex w-full gap-3">
            <button className="flex flex-1 h-12 text-[#4F2712] items-center justify-center gap-2 rounded-lg bg-primary/20 px-4 font-bold text-text-main text-sm">
              <ChartBarIcon className="w-6 h-6" />
              <span className="truncate">Gerar Relatório</span>
            </button>

            <button className="flex flex-1 text-[#4F2712] h-12 items-center justify-center gap-2 rounded-lg bg-primary/20 px-4 font-bold text-text-main text-sm">
              <DocumentTextIcon className="w-6 h-6" />
              <span className="truncate">Declaração de Renda</span>
            </button>
          </div>
        </section>

        {/* Financial Module */}
        <section className="mt-8 shadow-md rounded-xl">
          <h2 className="text-text-main text-[22px] font-bold pb-3 text-[#4F2712] pt-10 pl-4">
            Visão Geral Financeira
          </h2>

          <div className="flex flex-col gap-4 rounded-xl bg-card-light-1 p-4 shadow-sm">
            {/* Cash Flow Projection Chart */}
            <div className="flex flex-col">
              <p className="text-text-main font-medium text-[#4F2712]">Projeção de Fluxo de Caixa</p>
              <p className="text-text-main text-[32px] font-bold truncate text-[#4F2712]">
                R$ 1.250,70
              </p>

              <div className="flex gap-1 items-center">
                <p className="text-text-main/70 text-[#96624D]">Próximos 30 dias</p>
                <div className="flex items-center text-success font-medium text-[#059663]">
                  <ArrowUpIcon className="w-5 h-5" />
                  <span>8.2%</span>
                </div>
              </div>

              <div className="flex min-h-[160px] flex-col pt-4">
                {/* SVG Chart */}
                <svg
                  fill="none"
                  height="136"
                  viewBox="-3 0 478 140"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 109C18.1538 109..." fill="url(#paint0_linear_chart)" />
                  <path
                    d="M0 109C18.1538 109..."
                    stroke="#34A7B2"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_chart"
                      x1="236"
                      x2="236"
                      y1="1"
                      y2="139"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#34A7B2" stopOpacity="0.2" />
                      <stop offset="1" stopColor="#34A7B2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <hr className="border-text-main/10" />

            {/* Alerts */}
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-text-main text-[#4F2712]">Alertas de Vencimentos</h3>
                <a className="text-primary font-bold text-sm" href="#">
                  Ver todos
                </a>
              </div>

              <ul className="space-y-3">
                <li className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <ReceiptRefundIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-main text-[#4F2712]">Conta de Luz</p>
                      <p className="text-sm text-text-main/70 text-[#96624D]">Vence em 2 dias</p>
                    </div>
                  </div>
                  <p className="font-bold text-secondary text-[#B95760]">R$ 180,50</p>
                </li>

                <li className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CreditCardIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-main text-[#4F2712]">Aluguel do Espaço</p>
                      <p className="text-sm text-text-main/70 text-[#96624D]">Vence em 5 dias</p>
                    </div>
                  </div>
                  <p className="font-bold text-text-main text-[#4F2712]">R$ 850,00</p>
                </li>
              </ul>
            </div>

            <hr className="border-text-main/10" />

            <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-transparent text-primary text-sm font-bold px-4">
              <Squares2X2Icon className="w-5 h-5" />
              Ver todas as categorias
            </button>
          </div>
        </section>

        {/* DASN-SIMEI Assistant */}
        <section className="mt-8">
          <h2 className="text-text-main text-[22px] font-bold pb-3 text-[#4F2712]">
            Assistente de Impostos (MEI)
          </h2>

          <div className="flex flex-col gap-4 rounded-xl bg-card-light-1 p-4 shadow-sm">
            <div>
              <h3 className="font-semibold text-text-main text-[#4F2712]">Declaração Anual 2024</h3>
              <p className="text-sm text-text-main/70 mb-3">Status: Pendente</p>

              <button className="flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-[#B95760] px-5 text-white font-semibold ">
                <PencilSquareIcon className="w-6 h-6" />
                Iniciar Pré-preenchimento
              </button>
            </div>

            <hr className="border-text-main/10" />

            <div>
              <h3 className="font-semibold text-text-main text-[#4F2712]">Lembretes Automáticos</h3>

              <div className="mt-2 flex gap-3 rounded-lg bg-[#E7F7F8] p-3">
                <CalendarDaysIcon className="w-6 h-6 text-primary mt-1" />

                <div>
                  <p className="font-semibold text-text-main text-[#4F2712]">Próximo Vencimento do DAS</p>
                  <p className="text-sm text-text-main/70 text-[#96624D]">20 de Julho de 2024</p>
                </div>
              </div>
            </div>

            <hr className="border-text-main/10" />

            <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-transparent text-primary text-sm font-bold px-4 pb-10 pt-4">
              <ClockIcon className="w-5 h-5" />
              Acessar Histórico de Declarações
            </button>
          </div>
        </section>
      </main>

      <MenuInferior/>
    </div>
  );
}
