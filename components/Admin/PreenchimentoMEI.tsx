"use client";

import React, { useState } from "react";
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
import MenuInferior from "./MenuInferior";

export default function CadastroConfeiteira() {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-content-light">
      {/* Header */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon className="w-7 h-7 cursor-pointer text-[#4F2712]"
          onClick={() => router.back()} />
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
          <div className="flex-grow h-px bg-secondary/30"></div>
        </div>

        <label className="flex flex-col">
          <p className="text-secondary font-medium pb-2 text-[#0A0A0A]">Nome completo</p>
          <input
            type="text"
            placeholder="Ex: Maria Silva"
            className="form-input w-full rounded-lg bg-subtle-light h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-secondary text-[#0A0A0A] font-medium pb-2">CPF</p>
          <input
            type="text"
            placeholder="000.000.000-00"
            inputMode="numeric"
            className="form-input w-full rounded-lg bg-subtle-light h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-secondary text-[#0A0A0A] font-medium pb-2 ">Email</p>
          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            className="w-full rounded-lg bg-subtle-light h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-secondary text-[#0A0A0A] font-medium pb-2">Telefone / WhatsApp</p>
          <input
            type="text"
            placeholder="(00) 90000-0000"
            className="w-full rounded-lg bg-subtle-light h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        {/* Endereço */}
        <div className="flex items-center gap-4 pt-2 pb-2">
          <h3 className="text-lg font-bold text-[#4F2712]">Endereço</h3>
          <div className="flex-grow h-px bg-secondary/30"></div>
        </div>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2 text-[#0A0A0A]">Endereço completo</p>
          <input
            type="text"
            placeholder="Rua, número, complemento"
            className="rounded-lg bg-subtle-light h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <p className="text-base font-medium pb-2 text-[#0A0A0A]">Cidade</p>
            <input
              type="text"
              placeholder="Ex: São Paulo"
              className="rounded-lg bg-subtle-light h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:outline-none"
            />
          </label>

          <label className="flex flex-col">
            <p className="text-base font-medium pb-2 text-[#0A0A0A]">Estado</p>
            <input
              type="text"
              placeholder="SP"
              className="rounded-lg bg-subtle-light h-14 p-4 focus:ring-2 focus:ring-[#B95760] focus:outline-none"
            />
          </label>
        </div>

        {/* Negócio */}
        <div className="flex items-center gap-4 pt-2 pb-2">
          <h3 className="text-lg font-bold text-[#4F2712]">Negócio</h3>
          <div className="flex-grow h-px bg-secondary/30"></div>
        </div>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Nome do negócio</p>
          <input
            type="text"
            placeholder="Ex: Delícias da Maria"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Tipo de produtos</p>
          <input
            type="text"
            placeholder="Bolos, doces, cupcakes..."
            className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">CNPJ (se MEI)</p>
          <input
            type="text"
            placeholder="00.000.000/0001-00"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">CNAE (opcional)</p>
          <input
            type="text"
            placeholder="Ex: 5620-1/04"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        {/* Renda / Declaração */}
        <div className="flex items-center gap-4 pt-2 pb-2">
          <h3 className="text-lg font-bold text-[#4F2712]">Informações para Declaração</h3>
          <div className="flex-grow h-px bg-secondary/30"></div>
        </div>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Faturamento mensal (média)</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            inputMode="decimal"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Faturamento anual (últimos 12 meses)</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            inputMode="decimal"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Descrição adicional (opcional)</p>
          <input
            type="text"
            placeholder="Observações..."
            className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>
      </main>

      {/* Footer */}
      <div className="sticky bottom-0 bg-background-light p-4 pt-2">
        <div className="flex gap-4">
          <button className="flex w-full justify-center items-center rounded-xl bg-background-light h-14 text-primary border text-base font-bold">
            Cancelar
          </button>
          <button className="flex w-full justify-center items-center rounded-xl bg-primary h-14 text-background-light text-base font-bold">
            Salvar
          </button>
        </div>
      </div>
      <MenuInferior />
    </div>
  );
}
