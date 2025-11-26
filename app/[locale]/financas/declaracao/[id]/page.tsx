// app/financas/declaracao/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  PrinterIcon,
  ShareIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import MenuInferior from "@/components/Admin/MenuInferior";
import { useCart } from "@/contexts/CartContext";

export default function DetalhesDeclaracao() {
  const params = useParams();
  const router = useRouter();
  const { getTaxDeclaration } = useCart();
  
  const [declaration, setDeclaration] = useState<any>(null);

  useEffect(() => {
    const loadDeclaration = () => {
      if (params.id) {
        const foundDeclaration = getTaxDeclaration(params.id as string);
        setDeclaration(foundDeclaration);
      }
    };

    loadDeclaration();
    window.addEventListener('storage', loadDeclaration);
    return () => window.removeEventListener('storage', loadDeclaration);
  }, [params.id, getTaxDeclaration]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (!declaration) {
    return (
      <div className="min-h-screen bg-[#FFFFF4] flex items-center justify-center">
        <div className="text-center">
          <DocumentTextIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Declaração não encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFF4] pb-24">
      {/* Header */}
      <header className="flex items-center bg-[#EEEDDF] p-4 justify-between sticky top-0 z-10">
        <ArrowLeftIcon 
          className="w-7 h-7 cursor-pointer text-[#4F2712]" 
          onClick={() => router.back()} 
        />
        <h1 className="text-lg font-bold text-[#4F2712]">Declaração {declaration.year}</h1>
        <QuestionMarkCircleIcon className="w-7 h-7 text-[#4F2712]" />
      </header>

      <main className="p-4 space-y-6">
        {/* Cabeçalho */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-[#4F2712]">
                DASN-SIMEI {declaration.year}
              </h2>
              <p className="text-gray-600">
                {declaration.submittedAt 
                  ? `Enviada em ${formatDate(declaration.submittedAt)}`
                  : 'Rascunho não enviado'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:text-[#34A7B2]"
              >
                <PrinterIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-[#34A7B2]">
                <ShareIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dados Pessoais */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#4F2712] mb-3">Dados Pessoais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Nome:</span>
              <p className="font-semibold">{declaration.data.personal.name}</p>
            </div>
            <div>
              <span className="text-gray-600">CPF:</span>
              <p className="font-semibold">{declaration.data.personal.cpf}</p>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <p className="font-semibold">{declaration.data.personal.email}</p>
            </div>
            <div>
              <span className="text-gray-600">Telefone:</span>
              <p className="font-semibold">{declaration.data.personal.phone}</p>
            </div>
          </div>
        </section>

        {/* Endereço */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#4F2712] mb-3">Endereço</h3>
          <div className="text-sm">
            <p className="font-semibold">{declaration.data.address.street}</p>
            <p className="text-gray-600">
              {declaration.data.address.city} - {declaration.data.address.state}
            </p>
          </div>
        </section>

        {/* Dados do Negócio */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#4F2712] mb-3">Dados do Negócio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Nome do Negócio:</span>
              <p className="font-semibold">{declaration.data.business.name}</p>
            </div>
            <div>
              <span className="text-gray-600">CNPJ:</span>
              <p className="font-semibold">{declaration.data.business.cnpj || 'Não informado'}</p>
            </div>
            <div>
              <span className="text-gray-600">Atividade:</span>
              <p className="font-semibold">{declaration.data.business.productTypes}</p>
            </div>
            <div>
              <span className="text-gray-600">CNAE:</span>
              <p className="font-semibold">{declaration.data.business.cnae || 'Não informado'}</p>
            </div>
          </div>
        </section>

        {/* Informações Financeiras */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#4F2712] mb-3">Informações Financeiras</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-gray-600">Faturamento Mensal</p>
              <p className="font-bold text-green-700 text-lg">
                {formatCurrency(declaration.data.financial.monthlyRevenue)}
              </p>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-gray-600">Faturamento Anual</p>
              <p className="font-bold text-blue-700 text-lg">
                {formatCurrency(declaration.data.financial.annualRevenue)}
              </p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-gray-600">Despesas Anuais</p>
              <p className="font-bold text-purple-700 text-lg">
                {formatCurrency(declaration.data.financial.totalExpenses)}
              </p>
            </div>
            
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-600">Lucro Líquido</p>
              <p className="font-bold text-orange-700 text-lg">
                {formatCurrency(declaration.data.financial.netProfit)}
              </p>
            </div>
          </div>

          {declaration.data.financial.additionalInfo && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 text-sm">Observações:</span>
              <p className="text-sm mt-1">{declaration.data.financial.additionalInfo}</p>
            </div>
          )}
        </section>

        {/* Status da Declaração */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#4F2712] mb-3">Status da Declaração</h3>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-full font-semibold ${
              declaration.status === 'submitted' ? 'bg-green-100 text-green-800' :
              declaration.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {declaration.status === 'submitted' ? '✓ Enviada' :
               declaration.status === 'draft' ? '📝 Rascunho' :
               declaration.status}
            </div>
            {declaration.submittedAt && (
              <span className="text-sm text-gray-600">
                Enviada em {formatDate(declaration.submittedAt)}
              </span>
            )}
          </div>
        </section>
      </main>

      <MenuInferior />
    </div>
  );
}