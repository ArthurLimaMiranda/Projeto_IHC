"use client";

import Link from "next/link";
import React, { useState } from "react";
import MenuInferior from "@/components/Admin/MenuInferior";

import {
  UserCircleIcon,
  BellIcon,
  Cog6ToothIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
  CalendarIcon,
  CubeIcon,
  CakeIcon,
} from "@heroicons/react/24/solid";

// ------------------------------
// MOCK DE ENTREGAS
// ------------------------------
const entregas = [
  {
    nome: "Ana Silva",
    produto: "Bolo de Chocolate",
    horario: "Hoje, 14:00",
    status: "Em produção",
    statusCor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    nome: "Carlos Pereira",
    produto: "Kit Festa Infantil",
    horario: "Hoje, 18:00",
    status: "Aguardando Pag.",
    statusCor: "text-orange-600 dark:text-orange-400",
  },
];

// ------------------------------
// COMPONENTE PRINCIPAL
// ------------------------------
export default function Dashboard() {
  const [periodo, setPeriodo] = useState("semanal");

  return (
    <div className="min-h-screen bg-[#FFFFF4]">

      {/* ------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------ */}
      <div className="bg-[#4F2712] px-6 pb-8 pt-4 text-brand-cream relative">
        
        {/* Topo */}
        <div className="flex items-start justify-between pb-6">

          {/* Perfil */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-pink">
              <UserCircleIcon className="h-8 w-8 text-white" />
            </div>

            <div>
              <p className="text-sm text-white/70">Bem-vinda,</p>
              <p className="text-lg font-bold text-white">Jane Austen</p>
            </div>
          </div>

          {/* Ícones */}
          <div className="flex items-center gap-4">
            <BellIcon className="h-6 w-6 text-white" />
            <Cog6ToothIcon className="h-6 w-6 text-white" />
          </div>

        </div>

        {/* Receita da semana */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-white/80">Receita da Semana</p>
          <p className="text-3xl font-bold text-white">R$ 1.850,75</p>
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* CARDS DE STATUS */}
      {/* ------------------------------------ */}
      <div className="relative -mt-6 px-4 z-10">
        <div className="flex justify-between gap-4 rounded-xl bg-white dark:bg-brand-brown/50 p-4 shadow-lg">
          
          <div className="flex flex-col text-center mx-auto">
            <p className="text-sm text-[#874823]">Receita Hoje</p>
            <p className="text-lg font-bold text-[#4F2712]">R$ 450,00</p>
          </div>

          <div className="border-l border-brand-brown/10"></div>

          <div className="flex flex-col text-center mx-auto">
            <p className="text-sm text-[#874823]">Pedidos Pendentes</p>
            <p className="text-lg font-bold text-[#4F2712]">3</p>
          </div>

        </div>
      </div>

      {/* ------------------------------------ */}
      {/* ACTION BUTTONS */}
      {/* ------------------------------------ */}
      <div className="grid grid-cols-2 gap-4 p-6">

        <Link
          href="/financas/despesas"
          className="flex flex-col items-center justify-center bg-[#34A7B2] rounded-xl p-4 text-white shadow-sm hover:scale-105 transition"
        >
          <BanknotesIcon className="h-6 w-6 text-white" />
          <span className="text-sm font-semibold">Registrar Despesa</span>
        </Link>

        <Link
          href="/financas/relatorio"
          className="flex flex-col items-center justify-center bg-[#B95760] rounded-xl p-4 text-white shadow-sm hover:scale-105 transition"
        >
          <DocumentChartBarIcon className="h-6 w-6 text-white" />
          <span className="text-sm font-semibold">Gerar Relatório</span>
        </Link>

        <Link
          href="/estoque"
          className="flex flex-col items-center justify-center bg-[#B95760] rounded-xl p-4 text-white shadow-sm hover:scale-105 transition"
        >
          <CubeIcon className="h-6 w-6 text-white" />
          <span className="text-sm font-semibold">Gerenciar Estoque</span>
        </Link>

        <Link
          href="/historico-pedidos/agenda"
          className="flex flex-col items-center justify-center bg-[#34A7B2] rounded-xl p-4 text-white shadow-sm hover:scale-105 transition"
        >
          <CalendarIcon className="h-6 w-6 text-white" />
          <span className="text-sm font-semibold">Gerenciar Agenda</span>
        </Link>

      </div>

      {/* ------------------------------------ */}
      {/* PRÓXIMAS ENTREGAS */}
      {/* ------------------------------------ */}
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <h2 className="text-xl font-bold text-[#4F2712]">Próximas Entregas</h2>
        <Link href="/historico-pedidos" className="text-sm font-bold text-[#34A7B2] hover:underline">
          Ver todos
        </Link>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <div className="max-h-72 overflow-y-auto">
          {entregas.map((entrega, index) => (
            <div key={index} className="flex items-center gap-4 rounded-lg bg-white p-3">

              <div className="flex size-12 items-center justify-center rounded-lg bg-brand-light-cyan/50">
                <CakeIcon className="h-6 w-6 text-[#B95760]" />
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-base font-medium text-brand-brown">{entrega.nome}</p>
                <p className="text-sm text-brand-brown/60">{entrega.produto}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-brand-brown">{entrega.horario}</p>
                <p className={`text-xs font-medium ${entrega.statusCor}`}>
                  {entrega.status}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* GRÁFICO DE VENDAS */}
      {/* ------------------------------------ */}

      <div className="flex justify-between px-4 pt-6">
        <h2 className="text-xl font-bold text-[#4F2712]">Gráfico de Vendas</h2>

        <select
          className="border border-primary/20 rounded-lg px-3 py-1.5 bg-white text-sm focus:ring-2 focus:ring-primary"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option value="semanal">Semanal</option>
          <option value="mensal">Mensal</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      <section className="flex flex-col gap-4 border rounded-xl mx-4 mt-4 mb-24 p-5 bg-white border-primary/10">
        <GraficoLinha periodo={periodo} />
      </section>

      <MenuInferior />
    </div>
  );
}

// --------------------------------------------------------
// GRÁFICO DINÂMICO
// --------------------------------------------------------
function GraficoLinha({ periodo }) {
  // MOCK DE DADOS
  const dados = {
    semanal: [30, 40, 25, 60, 75, 50, 90],
    mensal: [200, 300, 250, 400, 500, 450, 600, 550, 700],
    anual: [1200, 1500, 1800, 1700, 2100, 2500, 2300, 2600, 3000, 3200, 3500, 4000],
  };

  const labels = {
    semanal: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    mensal: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
    anual: ["2019", "2020", "2021", "2022", "2023", "2024"],
  };

  const valores = dados[periodo];
  const categorias = labels[periodo];

  const largura = 472;
  const altura = 150;

  const max = Math.max(...valores);
  const min = Math.min(...valores);

  const pontos = valores
    .map((v, i) => {
      const x = (i / (valores.length - 1)) * largura;
      const y = altura - ((v - min) / (max - min + 1)) * altura;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col gap-4 py-4">

      <svg
        fill="none"
        height="148"
        width="100%"
        viewBox={`0 0 ${largura} ${altura}`}
        preserveAspectRatio="none"
      >
        {/* Área */}
        <polyline points={pontos} fill="rgba(180,235,255,0.3)" />

        {/* Linha */}
        <polyline
          points={pontos}
          fill="none"
          stroke="#34A7B2"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Labels */}
      <div className="flex justify-around text-xs font-bold text-primary/70">
        {categorias.map((c, i) => (
          <p key={i}>{c}</p>
        ))}
      </div>

    </div>
  );
}
