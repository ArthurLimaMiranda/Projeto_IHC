// app/financas/historico-declaracoes/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MenuInferior from "@/components/Admin/MenuInferior";
import { useCart } from "@/contexts/CartContext";

export default function HistoricoDeclaracoes() {
  const router = useRouter();
  const { getTaxDeclarations, getTaxReminders, markReminderAsCompleted } = useCart();
  
  const [declarations, setDeclarations] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'submitted' | 'draft'>('all');

  useEffect(() => {
    const loadData = () => {
      const taxDeclarations = getTaxDeclarations();
      const taxReminders = getTaxReminders();
      
      setDeclarations(taxDeclarations);
      setReminders(taxReminders);
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [getTaxDeclarations, getTaxReminders]);

  const filteredDeclarations = declarations.filter(declaration => {
    if (filter === 'all') return true;
    return declaration.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'draft':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Enviada';
      case 'draft':
        return 'Rascunho';
      case 'rejected':
        return 'Rejeitada';
      case 'approved':
        return 'Aprovada';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleMarkReminderCompleted = (reminderId: string) => {
    markReminderAsCompleted(reminderId);
  };

  return (
    <div className="min-h-screen bg-[#FFFFF4] pb-24">
      {/* Header */}
      <header className="flex items-center bg-[#EEEDDF] p-4 justify-between sticky top-0 z-10">
        <ArrowLeftIcon 
          className="w-7 h-7 cursor-pointer text-[#4F2712]" 
          onClick={() => router.back()} 
        />
        <h1 className="text-lg font-bold text-[#4F2712]">Histórico de Declarações</h1>
        <QuestionMarkCircleIcon className="w-7 h-7 text-[#4F2712]" />
      </header>

      <main className="p-4 space-y-6">
        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { label: 'Todas', value: 'all' },
            { label: 'Enviadas', value: 'submitted' },
            { label: 'Rascunhos', value: 'draft' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value as any)}
              className={`flex h-9 items-center justify-center rounded-full px-4 shrink-0 text-sm font-medium ${
                filter === item.value
                  ? "bg-[#4F2712] text-white"
                  : "bg-white text-[#4F2712] border border-[#4F2712]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Lembretes */}
        {reminders.filter(r => !r.completed).length > 0 && (
          <section className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
            <h2 className="text-lg font-bold text-[#4F2712] mb-3 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Lembretes de Impostos
            </h2>
            
            <div className="space-y-3">
              {reminders
                .filter(reminder => !reminder.completed)
                .map(reminder => (
                  <div key={reminder.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex-1">
                      <h3 className="font-semibold text-yellow-800">{reminder.title}</h3>
                      <p className="text-sm text-yellow-700">{reminder.description}</p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Vencimento: {formatDate(reminder.dueDate)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleMarkReminderCompleted(reminder.id)}
                      className="ml-2 px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600"
                    >
                      Concluir
                    </button>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Lista de Declarações */}
        <section>
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">
            Minhas Declarações ({filteredDeclarations.length})
          </h2>

          {filteredDeclarations.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <DocumentTextIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "Nenhuma declaração encontrada." 
                  : `Nenhuma declaração ${filter === 'submitted' ? 'enviada' : 'em rascunho'}.`
                }
              </p>
              {filter === 'all' && (
                <button
                  onClick={() => router.push('/financas/preenchimento-mei')}
                  className="bg-[#B95760] text-white px-6 py-2 rounded-lg"
                >
                  Fazer Primeira Declaração
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeclarations
                .sort((a, b) => new Date(b.submittedAt || b.data.financial.annualRevenue).getTime() - new Date(a.submittedAt || a.data.financial.annualRevenue).getTime())
                .map(declaration => (
                  <div key={declaration.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-[#B95760] text-lg">
                          Declaração {declaration.year}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {declaration.submittedAt 
                            ? `Enviada em ${formatDate(declaration.submittedAt)}`
                            : 'Rascunho não enviado'
                          }
                        </p>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(declaration.status)}`}>
                        {getStatusIcon(declaration.status)}
                        <span className="ml-1">{getStatusText(declaration.status)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Faturamento:</span>
                        <p className="font-semibold">
                          {formatCurrency(declaration.data.financial.annualRevenue)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Lucro:</span>
                        <p className="font-semibold">
                          {formatCurrency(declaration.data.financial.netProfit)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {declaration.data.business.name}
                      </span>
                      <button
                        onClick={() => router.push(`/financas/declaracao/${declaration.id}`)}
                        className="flex items-center gap-1 text-[#34A7B2] text-sm font-medium"
                      >
                        <EyeIcon className="h-4 w-4" />
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>

      {/* Botão Nova Declaração */}
      <button
        onClick={() => router.push('/financas/preenchimento-mei')}
        className="fixed bottom-20 right-6 z-20 h-14 w-14 flex items-center justify-center rounded-full bg-[#B95760] text-white shadow-lg hover:bg-[#A0464E] transition-colors"
      >
        <DocumentTextIcon className="h-6 w-6" />
      </button>

      <MenuInferior />
    </div>
  );
}