// app/financas/preenchimento-mei/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  HomeIcon,
  BuildingOfficeIcon,
  CakeIcon,
  DocumentTextIcon,
  CalculatorIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MenuInferior from "@/components/Admin/MenuInferior";
import { useCart } from "@/contexts/CartContext";

export default function PreenchimentoMEI() {
  const router = useRouter();
  const { 
    generatePreFilledDeclaration, 
    saveTaxDeclaration,
    calculateTaxObligations,
    getBusinessInfo 
  } = useCart();
  
  const [formData, setFormData] = useState<any>(null);
  const [taxCalculation, setTaxCalculation] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const preFilledData = generatePreFilledDeclaration();
      setFormData(preFilledData);
      
      if (preFilledData.financial) {
        const calculation = calculateTaxObligations(preFilledData.financial.annualRevenue);
        setTaxCalculation(calculation);
      }
    };

    loadData();
  }, [generatePreFilledDeclaration, calculateTaxObligations]);

  const handleInputChange = (section: string, field: string, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (status: 'draft' | 'submitted' = 'submitted') => {
    if (!formData) return;

    setIsSubmitting(true);
    
    try {
      const declaration = {
        year: new Date().getFullYear().toString(),
        status: status,
        data: formData
      };

      saveTaxDeclaration(declaration);
      
      if (status === 'submitted') {
        alert("Declaração enviada com sucesso!");
        router.push("/financas/historico-declaracoes");
      } else {
        alert("Rascunho salvo com sucesso!");
        router.back();
      }
    } catch (error) {
      alert("Erro ao salvar declaração. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#FFFFF4] flex items-center justify-center">
        <div className="text-center">
          <CalculatorIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Carregando dados...</p>
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
        <h1 className="text-lg font-bold text-[#4F2712]">Pré-preenchimento DASN-SIMEI</h1>
        <QuestionMarkCircleIcon className="w-7 h-7 text-[#4F2712]" />
      </header>

      <main className="p-4 space-y-6">
        {/* Resumo Financeiro */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3 flex items-center gap-2">
            <CalculatorIcon className="h-5 w-5" />
            Resumo Financeiro para Declaração
          </h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-gray-600">Faturamento Anual</p>
              <p className="font-bold text-green-700 text-lg">
                {formatCurrency(formData.financial?.annualRevenue || 0)}
              </p>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-gray-600">Despesas Anuais</p>
              <p className="font-bold text-blue-700 text-lg">
                {formatCurrency(formData.financial?.totalExpenses || 0)}
              </p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-gray-600">Lucro Líquido</p>
              <p className="font-bold text-purple-700 text-lg">
                {formatCurrency(formData.financial?.netProfit || 0)}
              </p>
            </div>
            
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-600">DAS Mensal</p>
              <p className="font-bold text-orange-700 text-lg">
                {taxCalculation ? formatCurrency(taxCalculation.dasValue) : 'R$ 77,10'}
              </p>
            </div>
          </div>

          {taxCalculation && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Observações Importantes:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                {taxCalculation.observations.map((obs: string, index: number) => (
                  <li key={index}>• {obs}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Dados Pessoais */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">Dados Pessoais</h2>
          
          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">Nome completo</span>
              <input
                type="text"
                value={formData.personal.name}
                onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-1">CPF</span>
                <input
                  type="text"
                  value={formData.personal.cpf}
                  onChange={(e) => handleInputChange('personal', 'cpf', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-1">Telefone</span>
                <input
                  type="text"
                  value={formData.personal.phone}
                  onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
                />
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">Email</span>
              <input
                type="email"
                value={formData.personal.email}
                onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
              />
            </label>
          </div>
        </section>

        {/* Endereço */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">Endereço</h2>
          
          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">Endereço completo</span>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-1">Cidade</span>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-1">Estado</span>
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Dados do Negócio */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">Dados do Negócio</h2>
          
          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">Nome do negócio</span>
              <input
                type="text"
                value={formData.business.name}
                onChange={(e) => handleInputChange('business', 'name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">Tipo de produtos/serviços</span>
              <input
                type="text"
                value={formData.business.productTypes}
                onChange={(e) => handleInputChange('business', 'productTypes', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-1">CNPJ</span>
                <input
                  type="text"
                  value={formData.business.cnpj}
                  onChange={(e) => handleInputChange('business', 'cnpj', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-1">CNAE</span>
                <input
                  type="text"
                  value={formData.business.cnae}
                  onChange={(e) => handleInputChange('business', 'cnae', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Informações Financeiras Detalhadas */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">Informações Financeiras</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-1">Faturamento mensal (média)</span>
                <input
                  type="text"
                  value={formatCurrency(formData.financial.monthlyRevenue)}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-1">Faturamento anual</span>
                <input
                  type="text"
                  value={formatCurrency(formData.financial.annualRevenue)}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">Observações adicionais</span>
              <textarea
                value={formData.financial.additionalInfo}
                onChange={(e) => handleInputChange('financial', 'additionalInfo', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
                placeholder="Alguma observação importante sobre sua declaração..."
              />
            </label>
          </div>
        </section>
      </main>

      {/* Footer Fixo */}
      <div className="left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleSubmit('draft')}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 border border-[#B95760] text-[#B95760] rounded-lg font-semibold disabled:opacity-50"
          >
            Salvar Rascunho
          </button>
          <button
            onClick={() => handleSubmit('submitted')}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 bg-[#B95760] text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <CheckCircleIcon className="h-5 w-5" />
            {isSubmitting ? 'Enviando...' : 'Enviar Declaração'}
          </button>
        </div>
      </div>

      <MenuInferior />
    </div>
  );
}