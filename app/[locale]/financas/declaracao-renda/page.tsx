// app/financas/declaracao-renda/page.tsx - ATUALIZADA
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
  GlobeAltIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MenuInferior from "@/components/Admin/MenuInferior";
import { useCart } from "@/contexts/CartContext";

export default function CadastroConfeiteira() {
  const router = useRouter();
  const { saveBusinessInfo, getBusinessInfo } = useCart();
  
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      cpf: "",
      email: "",
      phone: ""
    },
    address: {
      street: "",
      city: "",
      state: ""
    },
    business: {
      name: "",
      productTypes: "",
      cnpj: "",
      cnae: ""
    },
    financial: {
      monthlyRevenue: 0,
      annualRevenue: 0,
      additionalInfo: ""
    }
  });

  useEffect(() => {
    const savedData = getBusinessInfo();
    if (savedData) {
      setFormData(savedData);
    }
  }, [getBusinessInfo]);

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    saveBusinessInfo(formData);
    alert("Informações salvas com sucesso!");
    router.back();
  };

  const formatCurrency = (value: string) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    // Converte para número e formata como moeda
    return (Number(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleCurrencyChange = (field: string, value: string) => {
    const numericValue = value.replace(/\D/g, '');
    handleInputChange('financial', field, numericValue);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#FFFFF4]">
      {/* Header */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon 
            className="w-7 h-7 cursor-pointer text-[#4F2712]"
            onClick={() => router.back()} 
          />
        </div>

        <h1 className="text-text-main text-lg font-bold flex-1 text-center text-[#4F2712]">
          Declaração de Renda
        </h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main">
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-3 flex flex-col gap-8">

        {/* Título */}
        <h1 className="text-xl font-bold pt-4 pb-1 text-[#4F2712]">Informações do Negócio</h1>

        {/* Dados Pessoais */}
        <div className="flex items-center gap-4 pb-2">
          <h3 className="text-lg font-bold text-[#4F2712]">Dados Pessoais</h3>
          <div className="flex-grow h-px bg-[#B95760]/30"></div>
        </div>

        <label className="flex flex-col">
          <p className="text-[#4F2712] font-medium pb-2">Nome completo</p>
          <input
            type="text"
            placeholder="Ex: Maria Silva"
            value={formData.personal.name}
            onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
            className="w-full rounded-lg bg-white border border-gray-300 h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-[#4F2712] font-medium pb-2">CPF</p>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={formData.personal.cpf}
            onChange={(e) => handleInputChange('personal', 'cpf', e.target.value)}
            inputMode="numeric"
            className="w-full rounded-lg bg-white border border-gray-300 h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-[#4F2712] font-medium pb-2">Email</p>
          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            value={formData.personal.email}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
            className="w-full rounded-lg bg-white border border-gray-300 h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-[#4F2712] font-medium pb-2">Telefone / WhatsApp</p>
          <input
            type="text"
            placeholder="(00) 90000-0000"
            value={formData.personal.phone}
            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
            className="w-full rounded-lg bg-white border border-gray-300 h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        {/* Endereço */}
        <div className="flex items-center gap-4 pt-2 pb-2">
          <h3 className="text-lg font-bold text-[#4F2712]">Endereço</h3>
          <div className="flex-grow h-px bg-[#B95760]/30"></div>
        </div>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2 text-[#4F2712]">Endereço completo</p>
          <input
            type="text"
            placeholder="Rua, número, complemento"
            value={formData.address.street}
            onChange={(e) => handleInputChange('address', 'street', e.target.value)}
            className="rounded-lg bg-white border border-gray-300 h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <p className="text-base font-medium pb-2 text-[#4F2712]">Cidade</p>
            <input
              type="text"
              placeholder="Ex: São Paulo"
              value={formData.address.city}
              onChange={(e) => handleInputChange('address', 'city', e.target.value)}
              className="rounded-lg bg-white border border-gray-300 h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
            />
          </label>

          <label className="flex flex-col">
            <p className="text-base font-medium pb-2 text-[#4F2712]">Estado</p>
            <input
              type="text"
              placeholder="SP"
              value={formData.address.state}
              onChange={(e) => handleInputChange('address', 'state', e.target.value)}
              className="rounded-lg bg-white border border-gray-300 h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
            />
          </label>
        </div>

        {/* Negócio */}
        <div className="flex items-center gap-4 pt-2 pb-2">
          <h3 className="text-lg font-bold text-[#4F2712]">Negócio</h3>
          <div className="flex-grow h-px bg-[#B95760]/30"></div>
        </div>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Nome do negócio</p>
          <input
            type="text"
            placeholder="Ex: Delícias da Maria"
            value={formData.business.name}
            onChange={(e) => handleInputChange('business', 'name', e.target.value)}
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Tipo de produtos</p>
          <input
            type="text"
            placeholder="Bolos, doces, cupcakes..."
            value={formData.business.productTypes}
            onChange={(e) => handleInputChange('business', 'productTypes', e.target.value)}
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">CNPJ (se MEI)</p>
          <input
            type="text"
            placeholder="00.000.000/0001-00"
            value={formData.business.cnpj}
            onChange={(e) => handleInputChange('business', 'cnpj', e.target.value)}
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">CNAE (opcional)</p>
          <input
            type="text"
            placeholder="Ex: 5620-1/04"
            value={formData.business.cnae}
            onChange={(e) => handleInputChange('business', 'cnae', e.target.value)}
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        {/* Renda / Declaração */}
        <div className="flex items-center gap-4 pt-2 pb-2">
          <h3 className="text-lg font-bold text-[#4F2712]">Informações para Declaração</h3>
          <div className="flex-grow h-px bg-[#B95760]/30"></div>
        </div>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Faturamento mensal (média)</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            value={formatCurrency(formData.financial.monthlyRevenue.toString())}
            onChange={(e) => handleCurrencyChange('monthlyRevenue', e.target.value)}
            inputMode="decimal"
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Faturamento anual (últimos 12 meses)</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            value={formatCurrency(formData.financial.annualRevenue.toString())}
            onChange={(e) => handleCurrencyChange('annualRevenue', e.target.value)}
            inputMode="decimal"
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Descrição adicional (opcional)</p>
          <input
            type="text"
            placeholder="Observações..."
            value={formData.financial.additionalInfo}
            onChange={(e) => handleInputChange('financial', 'additionalInfo', e.target.value)}
            className="w-full h-14 p-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#B95760] focus:border-transparent"
          />
        </label>
      </main>

      {/* Footer */}
      <div className="sticky bottom-0 bg-[#FFFFF4] p-4 pt-2 pb-24">
        <div className="flex gap-4">
          <button 
            onClick={() => router.back()}
            className="flex w-full justify-center items-center rounded-xl bg-white h-14 text-[#B95760] border border-[#B95760] text-base font-bold hover:bg-[#B95760]/10 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="flex w-full justify-center items-center rounded-xl bg-[#B95760] h-14 text-white text-base font-bold hover:bg-[#A0464E] transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>

      <MenuInferior />
    </div>
  );
}