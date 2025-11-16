"use client";

import React from "react";

export default function FinancasPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      {/* Top App Bar */}
      <header className="flex items-center bg-background-light p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </div>

        <h1 className="text-text-main text-lg font-bold flex-1 text-center">
          Finanças
        </h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main">
            <span className="material-symbols-outlined text-2xl">
              help_outline
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 pt-4 pb-8">
        {/* Quick Actions */}
        <section className="flex flex-col gap-3">
          <button className="flex w-full h-14 items-center justify-center gap-3 rounded-lg bg-primary px-5 text-white font-bold">
            <span className="material-symbols-outlined">add</span>
            <span className="truncate">Registrar Nova Despesa</span>
          </button>

          <div className="flex w-full gap-3">
            <button className="flex flex-1 h-12 items-center justify-center gap-2 rounded-lg bg-primary/20 px-4 font-bold text-text-main text-sm">
              <span className="material-symbols-outlined text-xl">
                bar_chart
              </span>
              <span className="truncate">Gerar Relatório</span>
            </button>

            <button className="flex flex-1 h-12 items-center justify-center gap-2 rounded-lg bg-primary/20 px-4 font-bold text-text-main text-sm">
              <span className="material-symbols-outlined text-xl">
                description
              </span>
              <span className="truncate">Declaração de Renda</span>
            </button>
          </div>
        </section>

        {/* Financial Module */}
        <section className="mt-8">
          <h2 className="text-text-main text-[22px] font-bold pb-3">
            Visão Geral Financeira
          </h2>

          <div className="flex flex-col gap-4 rounded-xl bg-card-light-1 p-4 shadow-sm">
            {/* Cash Flow Projection Chart */}
            <div className="flex flex-col">
              <p className="text-text-main font-medium">Projeção de Fluxo de Caixa</p>
              <p className="text-text-main text-[32px] font-bold truncate">
                R$ 1.250,70
              </p>

              <div className="flex gap-1 items-center">
                <p className="text-text-main/70">Próximos 30 dias</p>
                <div className="flex items-center text-success font-medium">
                  <span className="material-symbols-outlined text-lg">
                    arrow_upward
                  </span>
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
                  <path
                    d="M0 109C18.1538 109..."
                    fill="url(#paint0_linear_chart)"
                  />
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
                <h3 className="font-semibold text-text-main">Alertas de Vencimentos</h3>
                <a className="text-primary font-bold text-sm" href="#">
                  Ver todos
                </a>
              </div>

              <ul className="space-y-3">
                <li className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <span className="material-symbols-outlined">
                        receipt_long
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-main">Conta de Luz</p>
                      <p className="text-sm text-text-main/70">Vence em 2 dias</p>
                    </div>
                  </div>
                  <p className="font-bold text-secondary">R$ 180,50</p>
                </li>

                <li className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">
                        payments
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-main">
                        Aluguel do Espaço
                      </p>
                      <p className="text-sm text-text-main/70">Vence em 5 dias</p>
                    </div>
                  </div>
                  <p className="font-bold text-text-main">R$ 850,00</p>
                </li>
              </ul>
            </div>

            <hr className="border-text-main/10" />

            <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-transparent text-primary text-sm font-bold px-4">
              <span className="material-symbols-outlined">category</span>
              Ver todas as categorias
            </button>
          </div>
        </section>

        {/* DASN-SIMEI Assistant */}
        <section className="mt-8">
          <h2 className="text-text-main text-[22px] font-bold pb-3">
            Assistente de Impostos (MEI)
          </h2>

          <div className="flex flex-col gap-4 rounded-xl bg-card-light-1 p-4 shadow-sm">
            <div>
              <h3 className="font-semibold text-text-main">
                Declaração Anual 2024
              </h3>
              <p className="text-sm text-text-main/70 mb-3">Status: Pendente</p>

              <button className="flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-5 text-white font-bold">
                <span className="material-symbols-outlined">edit_document</span>
                Iniciar Pré-preenchimento
              </button>
            </div>

            <hr className="border-text-main/10" />

            <div>
              <h3 className="font-semibold text-text-main">
                Lembretes Automáticos
              </h3>

              <div className="mt-2 flex gap-3 rounded-lg bg-primary/10 p-3">
                <span className="material-symbols-outlined text-primary mt-1">
                  calendar_month
                </span>

                <div>
                  <p className="font-semibold text-text-main">
                    Próximo Vencimento do DAS
                  </p>

                  <p className="text-sm text-text-main/70">20 de Julho de 2024</p>
                </div>
              </div>
            </div>

            <hr className="border-text-main/10" />

            <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-transparent text-primary text-sm font-bold px-4">
              <span className="material-symbols-outlined">history</span>
              Acessar Histórico de Declarações
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
