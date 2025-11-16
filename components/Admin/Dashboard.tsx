'use client'

import Link from 'next/link'
import React from "react";
import MenuInferior from "@/components/Admin/MenuInferior";
import {
UserCircleIcon,
BellIcon,
Cog6ToothIcon,
BanknotesIcon,
DocumentChartBarIcon,
CalendarIcon,
CubeIcon
} from "@heroicons/react/24/solid";

const entregas = [
  {
    nome: "Ana Silva",
    produto: "Bolo de Chocolate",
    horario: "Hoje, 14:00",
    status: "Em produção",
    statusCor: "text-yellow-600 dark:text-yellow-400",
    icon: "cake",
  },
  {
    nome: "Carlos Pereira",
    produto: "Kit Festa Infantil",
    horario: "Hoje, 18:00",
    status: "Aguardando Pag.",
    statusCor: "text-orange-600 dark:text-orange-400",
    icon: "celebration",
  },
  // Adicione mais entregas aqui
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FFFFF4]">
      {/* Header */}
    <div className="bg-[#4F2712] px-6 pb-8 pt-4 text-brand-cream relative">
    {/* Header Superior */}
    <div className="flex items-start justify-between pb-6">
        
        {/* Perfil */}
        <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-pink">
            <UserCircleIcon className="h-8 w-8 text-white" />
        </div>
        <div>
            <p className="text-sm font-normal leading-normal text-brand-cream/70 text-white">
            Bem-vinda,
            </p>
            <p className="text-lg font-bold leading-tight text-white">
            Jane Austen
            </p>
        </div>
        </div>
        {/* Ícones à direita */}
        <div className="flex items-center justify-between gap-4">
            {/* Notificação acima */}
            <BellIcon className="h-6 w-6 text-white" />
            {/* Configurações abaixo */}
            <Cog6ToothIcon className="h-6 w-6 text-white" />
        </div>

    </div>

    {/* Receita da semana */}
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
    <div className="relative -mt-6 px-4 z-10">
    <div className="flex justify-between gap-4 rounded-xl bg-white dark:bg-brand-brown/50 p-4 shadow-lg">
        <div className="flex flex-col text-center mx-auto">
        <p className="text-sm font-medium leading-normal text-[#874823]">
            Receita Hoje
        </p>
        <p className="text-lg font-bold leading-tight text-[#4F2712]">
            R$ 450,00
        </p>
        </div>
        <div className="border-l border-brand-brown/10 dark:border-brand-cream/10"></div>
        <div className="flex flex-col text-center mx-auto">
        <p className="text-sm font-medium leading-normal text-[#874823]">
            Pedidos Pendentes
        </p>
        <p className="text-lg font-bold leading-tight text-[#4F2712]">
            3
        </p>
        </div>
    </div>
    </div>


    {/* Action Buttons */}
    <div className="grid grid-cols-2 gap-4 p-6">
    {/* Botão 1 */}
    <button className="flex bg-[#34A7B2] flex-col items-center justify-center gap-2 rounded-xl p-4 text-white text-center shadow-sm transition-transform hover:scale-105">
        <BanknotesIcon className="h-6 w-6 text-white" />
        <span className="text-sm font-semibold">Registrar Despesa</span>
    </button>

    {/* Botão 2 */}
    <button className="flex bg-[#B95760] flex-col items-center justify-center gap-2 rounded-xl p-4 text-white text-center shadow-sm transition-transform hover:scale-105">
        <DocumentChartBarIcon className="h-6 w-6 text-white" />
        <span className="text-sm font-semibold">Gerar Relatório</span>
    </button>

    {/* Botão 3 */}
    <button className="flex bg-[#B95760] flex-col items-center justify-center gap-2 rounded-xl p-4 text-white text-center shadow-sm transition-transform hover:scale-105">
        <CubeIcon className="h-6 w-6 text-white" />
        <span className="text-sm font-semibold">Gerenciar Estoque</span>
    </button>

    {/* Botão 4 */}
    <button className="flex bg-[#34A7B2] flex-col items-center justify-center gap-2 rounded-xl p-4 text-white text-center shadow-sm transition-transform hover:scale-105">
        <CalendarIcon className="h-6 w-6 text-white" />
        <span className="text-sm font-semibold">Gerenciar Agenda</span>
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
    <div className="max-h-72 overflow-y-auto">
        {entregas.map((entrega, index) => (
        <div
            key={index}
            className="flex items-center gap-4 rounded-lg bg-white dark:bg-brand-brown/20 p-3"
        >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-light-cyan/50 text-brand-pink dark:bg-brand-light-cyan/10">
            <span className="material-symbols-outlined">{entrega.icon}</span>
            </div>
            <div className="flex flex-1 flex-col justify-center">
            <p className="text-base font-medium leading-normal text-brand-brown dark:text-brand-cream">
                {entrega.nome}
            </p>
            <p className="text-sm font-normal leading-normal text-brand-brown/60 dark:text-brand-cream/60">
                {entrega.produto}
            </p>
            </div>
            <div className="shrink-0 text-right">
            <p className="text-sm font-bold leading-normal text-brand-brown dark:text-brand-cream">
                {entrega.horario}
            </p>
            <p className={`text-xs font-medium ${entrega.statusCor}`}>
                {entrega.status}
            </p>
            </div>
        </div>
        ))}
    </div>
    </div>

      <MenuInferior />
    </div>
  )
}