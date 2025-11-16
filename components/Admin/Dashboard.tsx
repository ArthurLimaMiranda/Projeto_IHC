'use client'

import Link from 'next/link'
import React from "react";
import MenuInferior from "@/components/Admin/MenuInferior";


export default function Dashboard() {
  return (
    <div className="min-h-screen text-brand-brown dark:text-brand-cream">
      {/* Header */}
      <div className="bg-[#4F2712] px-4 pb-6 pt-4 text-brand-cream">
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-pink">
              <span className="material-symbols-outlined text-2xl">cake</span>
            </div>
            <div>
              <p className="text-sm font-normal leading-normal text-brand-cream/70 text-white">
                Bem-vinda,
              </p>
              <p className="text-lg font-bold leading-tight text-white">Ana Confeiteira</p>
            </div>
          </div>
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent text-brand-cream transition-colors hover:bg-white/10">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium leading-normal text-brand-cream/80 text-white">
            Receita da Semana
          </p>
          <p className="text-3xl font-bold leading-tight tracking-tight text-white">
            R$ 1.850,75
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="-mt-4 px-4">
        <div className="flex justify-between gap-4 rounded-xl bg-white dark:bg-brand-brown/50 p-4 shadow-sm">
          <div className="flex flex-col text-center">
            <p className="text-sm font-medium leading-normal text-brand-brown/80 dark:text-brand-cream/70">
              Receita Hoje
            </p>
            <p className="text-lg font-bold leading-tight text-brand-brown dark:text-brand-cream">
              R$ 450,00
            </p>
          </div>
          <div className="border-l border-brand-brown/10 dark:border-brand-cream/10"></div>
          <div className="flex flex-col text-center">
            <p className="text-sm font-medium leading-normal text-brand-brown/80 dark:text-brand-cream/70">
              Pedidos Pendentes
            </p>
            <p className="text-lg font-bold leading-tight text-brand-brown dark:text-brand-cream">
              3
            </p>
          </div>
        </div>
      </div>

    {/* Action Buttons */}
    <div className="grid grid-cols-2 gap-4 p-6">
    {/* Botão 1 */}
    <button className="flex bg-[#34A7B2] flex-col items-center justify-center gap-2 rounded-xl p-4 text-white text-center shadow-sm transition-transform hover:scale-105">
        <span className="text-sm font-bold">Registrar Despesa</span>
    </button>

    {/* Botão 2 */}
    <button className="flex bg-[#B95760] flex-col items-center justify-center gap-2 rounded-xl p-4 text-white text-center shadow-sm transition-transform hover:scale-105">
        <span className="text-sm font-bold">Gerar Relatório</span>
    </button>

    {/* Botão 3 */}
    <button className="flex bg-[#B95760] flex-col items-center justify-center gap-2 rounded-xl p-4 text-white text-center shadow-sm transition-transform hover:scale-105">
        <span className="text-sm font-bold">Gerenciar Insumo</span>
    </button>

    {/* Botão 4 */}
    <button className="flex bg-[#34A7B2] flex-col items-center justify-center gap-2 rounded-xl p-4 text-white text-center shadow-sm transition-transform hover:scale-105">
        <span className="text-sm font-bold">Gerenciar Agenda</span>
    </button>
    </div>

      {/* Next Deliveries */}
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#4F2712] dark:text-brand-cream">
          Próximas Entregas
        </h2>
        <Link
          className="text-sm font-bold text-[#34A7B2] hover:underline"
          href="#"
        >
          Ver todos
        </Link>
      </div>

      {/* Delivery List */}
      <div className="flex flex-col gap-2 px-4">
        <div className="flex items-center gap-4 rounded-lg bg-white dark:bg-brand-brown/20 p-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-light-cyan/50 text-brand-pink dark:bg-brand-light-cyan/10">
            <span className="material-symbols-outlined">cake</span>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-base font-medium leading-normal text-brand-brown dark:text-brand-cream">
              Ana Silva
            </p>
            <p className="text-sm font-normal leading-normal text-brand-brown/60 dark:text-brand-cream/60">
              Bolo de Chocolate
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-bold leading-normal text-brand-brown dark:text-brand-cream">
              Hoje, 14:00
            </p>
            <p className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
              Em produção
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg bg-white dark:bg-brand-brown/20 p-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-light-cyan/50 text-brand-pink dark:bg-brand-light-cyan/10">
            <span className="material-symbols-outlined">celebration</span>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-base font-medium leading-normal text-brand-brown dark:text-brand-cream">
              Carlos Pereira
            </p>
            <p className="text-sm font-normal leading-normal text-brand-brown/60 dark:text-brand-cream/60">
              Kit Festa Infantil
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-bold leading-normal text-brand-brown dark:text-brand-cream">
              Hoje, 18:00
            </p>
            <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
              Aguardando Pag.
            </p>
          </div>
        </div>
      </div>

      <MenuInferior />
    </div>
  )
}