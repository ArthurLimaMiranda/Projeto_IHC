// app/financas/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PlusIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ReceiptRefundIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  ClockIcon,
  Squares2X2Icon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";
import MenuInferior from "@/components/Admin/MenuInferior";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function FinancasPage() {
  const router = useRouter();
  const { getFinancialSummary, getExpenses, getAllOrders } = useCart();
  
  const [financialSummary, setFinancialSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    revenueGrowth: 0,
    expenseGrowth: 0,
    profitGrowth: 0
  });
  const [upcomingExpenses, setUpcomingExpenses] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      const summary = getFinancialSummary('month');
      setFinancialSummary(summary);

      // Carregar despesas próximas do vencimento
      const expenses = getExpenses();
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const upcoming = expenses
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= today && expenseDate <= nextWeek;
        })
        .slice(0, 2); // Mostrar apenas 2 próximas despesas

      setUpcomingExpenses(upcoming);
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [getFinancialSummary, getExpenses]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0;
    const icon = isPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />;
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        {icon}
        <span>{Math.abs(growth).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#FFFFF4]">
      {/* Top App Bar */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon 
            className="w-7 h-7 cursor-pointer text-[#4F2712]"
            onClick={() => router.back()} 
          />
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

      <main className="flex-1 px-4 pt-4 mb-24">
        {/* Quick Actions */}
        <section className="flex flex-col gap-3">
          <Link href="/financas/despesas">
            <button className="flex w-full h-14 items-center justify-center gap-3 rounded-lg bg-[#B95760] px-5 text-white font-bold hover:bg-[#A0464E] transition-colors">
              <PlusIcon className="w-6 h-6" />
              <span className="truncate text-white">Registrar Nova Despesa</span>
            </button>
          </Link>

          <div className="flex flex-col w-full gap-3">
            <Link href="/financas/resumo" className="flex-1">
              <button className="flex w-full h-12 text-[#4F2712] items-center justify-center gap-2 rounded-lg bg-[#34A7B2]/20 px-4 font-bold text-text-main text-sm hover:bg-[#34A7B2]/30 transition-colors">
                <ChartBarIcon className="w-6 h-6" />
                <span className="truncate">Gerar Relatório</span>
              </button>
            </Link>

            <Link href="/financas/declaracao-renda" className="flex-1">
              <button className="flex w-full text-[#4F2712] h-12 items-center justify-center gap-2 rounded-lg bg-[#34A7B2]/20 px-4 font-bold text-text-main text-sm hover:bg-[#34A7B2]/30 transition-colors">
                <DocumentTextIcon className="w-6 h-6" />
                <span className="truncate">Declaração de Renda</span>
              </button>
            </Link>
          </div>
        </section>

        {/* Financial Module */}
        <section className="mt-8 shadow-md rounded-xl">
          <h2 className="text-text-main text-[22px] font-bold pb-3 text-[#4F2712] pt-6 pl-4">
            Visão Geral Financeira
          </h2>

          <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
            {/* Cash Flow Projection */}
            <div className="flex flex-col">
              <p className="text-text-main font-medium text-[#4F2712]">Saldo Atual</p>
              <p className="text-text-main text-[32px] font-bold truncate text-[#4F2712]">
                {formatCurrency(financialSummary.netProfit)}
              </p>

              <div className="flex gap-1 items-center">
                <p className="text-text-main/70 text-[#96624D]">Este mês</p>
                {formatGrowth(financialSummary.profitGrowth)}
              </div>

              {/* Mini gráfico simplificado */}
              <div className="flex min-h-[80px] flex-col pt-4 justify-center">
                <div className="flex items-end gap-2 h-12">
                  {[30, 45, 60, 75, 65, 80].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-[#34A7B2] to-[#34A7B2]/50 rounded-t transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-text-main/10" />

            {/* Alerts */}
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-text-main text-[#4F2712]">Próximas Despesas</h3>
                <Link href="/financas/despesas-lista" className="text-[#B95760] font-bold text-sm">
                  Ver todas
                </Link>
              </div>

              {upcomingExpenses.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingExpenses.map((expense, index) => (
                    <li key={expense.id} className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 flex items-center justify-center rounded-full bg-[#B95760]/10 text-[#B95760]">
                          <ReceiptRefundIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-text-main text-[#4F2712]">{expense.category}</p>
                          <p className="text-sm text-text-main/70 text-[#96624D]">
                            {new Date(expense.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-[#B95760]">{formatCurrency(expense.amount)}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">Nenhuma despesa próxima</p>
              )}
            </div>
          </div>
        </section>

        {/* DASN-SIMEI Assistant */}
        <section className="mt-8">
          <h2 className="text-text-main text-[22px] font-bold pb-3 text-[#4F2712]">
            Assistente de Impostos (MEI)
          </h2>

          <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
            <div>
              <h3 className="font-semibold text-text-main text-[#4F2712]">Declaração Anual 2024</h3>
              <p className="text-sm text-text-main/70 mb-3">Status: Pendente</p>
              <Link href="/financas/preenchimento-mei">
                <button className="flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-[#B95760] px-5 text-white font-semibold hover:bg-[#A0464E] transition-colors">
                  <PencilSquareIcon className="w-6 h-6" />
                  Iniciar Pré-preenchimento
                </button>
              </Link>
            </div>
            <hr className="border-text-main/10" />

            <div>
              <h3 className="font-semibold text-text-main text-[#4F2712]">Lembretes Automáticos</h3>

              <div className="mt-2 flex gap-3 rounded-lg bg-[#E7F7F8] p-3">
                <CalendarDaysIcon className="w-6 h-6 text-[#34A7B2] mt-1" />

                <div>
                  <p className="font-semibold text-text-main text-[#4F2712]">Próximo Vencimento do DAS</p>
                  <p className="text-sm text-text-main/70 text-[#96624D]">20 de Julho de 2024</p>
                </div>
              </div>
            </div>

            <hr className="border-text-main/10" />

            <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-transparent text-[#34A7B2] text-sm font-bold px-4 pb-2 hover:bg-[#34A7B2]/10 transition-colors">
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