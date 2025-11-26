// app/financas/despesas-lista/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeftIcon, QuestionMarkCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MenuInferior from "@/components/Admin/MenuInferior";
import Link from "next/link";

export default function ListaDespesas() {
  const router = useRouter();
  const { getExpenses, getExpensesByCategory } = useCart();
  const [despesas, setDespesas] = useState<any[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

  useEffect(() => {
    const carregarDespesas = () => {
      let expenses = getExpenses();
      
      if (categoriaFiltro !== "Todas") {
        expenses = getExpensesByCategory(categoriaFiltro);
      }
      
      // Ordenar por data (mais recente primeiro)
      expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setDespesas(expenses);
    };

    carregarDespesas();
    window.addEventListener('storage', carregarDespesas);
    return () => window.removeEventListener('storage', carregarDespesas);
  }, [getExpenses, getExpensesByCategory, categoriaFiltro]);

  const categorias = ["Todas", "Ingredientes", "Embalagens", "Marketing", "Contas", "Aluguel", "Salários", "Outros"];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTotalDespesas = () => {
    return despesas.reduce((total, despesa) => total + despesa.amount, 0);
  };

  return (
    <div className="min-h-screen bg-[#FFFFF4] pb-24">
      <header className="flex items-center bg-[#EEEDDF] p-4 justify-between sticky top-0 z-10">
        <ArrowLeftIcon 
          className="w-7 h-7 cursor-pointer text-[#4F2712]" 
          onClick={() => router.back()} 
        />
        <h1 className="text-lg font-bold text-[#4F2712]">Todas as Despesas</h1>
        <QuestionMarkCircleIcon className="w-7 h-7 text-[#4F2712]" />
      </header>

      {/* Filtros */}
      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaFiltro(categoria)}
              className={`flex h-9 items-center justify-center rounded-full px-4 shrink-0 text-sm font-medium ${
                categoriaFiltro === categoria
                  ? "bg-[#4F2712] text-white"
                  : "bg-white text-[#4F2712] border border-[#4F2712]"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Resumo */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total em despesas:</span>
            <span className="text-xl font-bold text-[#B95760]">
              {formatCurrency(getTotalDespesas())}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {despesas.length} {despesas.length === 1 ? 'despesa' : 'despesas'} encontradas
          </p>
        </div>
      </div>

      <main className="px-4">
        {despesas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma despesa encontrada.</p>
            <Link href="/financas/despesas">
              <button className="mt-4 bg-[#B95760] text-white px-6 py-2 rounded-lg">
                Registrar Primeira Despesa
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {despesas.map(despesa => (
              <div key={despesa.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#B95760]">{despesa.category}</h3>
                    {despesa.subcategory && (
                      <p className="text-sm text-gray-600">{despesa.subcategory}</p>
                    )}
                    {despesa.description && (
                      <p className="text-sm text-gray-600 mt-1">{despesa.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{new Date(despesa.date).toLocaleDateString('pt-BR')}</span>
                      {despesa.supplier && (
                        <>
                          <span>•</span>
                          <span>{despesa.supplier}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{despesa.paymentMethod}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#4F2712] text-lg">
                    {formatCurrency(despesa.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Botão flutuante */}
      <Link href="/financas/despesas">
        <button className="fixed bottom-20 right-6 z-20 h-14 w-14 flex items-center justify-center rounded-full bg-[#B95760] text-white shadow-lg hover:bg-[#A0464E] transition-colors">
          <PlusIcon className="w-6 h-6" />
        </button>
      </Link>

      <MenuInferior />
    </div>
  );
}