"use client";
import React, { useState } from "react";
import {
  ArrowLeftIcon,
  PlusIcon,
  CameraIcon,
  BuildingStorefrontIcon,
  CreditCardIcon,
  BanknotesIcon,
  GiftTopIcon,
  ArchiveBoxIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  HomeModernIcon,
  UsersIcon,
  FolderIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import MenuInferior from "./MenuInferior";
import { useRouter } from "next/navigation";

// Categorias convertidas para Heroicons
const categories = [
  { label: "Ingredientes", icon: GiftTopIcon },
  { label: "Embalagens", icon: ArchiveBoxIcon },
  { label: "Marketing", icon: MegaphoneIcon },
  { label: "Contas", icon: DocumentTextIcon },
  { label: "Aluguel", icon: HomeModernIcon },
  { label: "Salários", icon: UsersIcon },
  { label: "Outros", icon: FolderIcon },
];

const subcategories = ["Farinhas", "Laticínios", "Açúcares", "Frutas"];
const paymentTypes = ["Cartão de Crédito", "Cartão de Débito", "PIX", "Dinheiro"];

export default function RegistroDespesa() {
    const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Ingredientes");

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-content-light">
      {/* Top App Bar */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon className="w-7 h-7 cursor-pointer text-[#4F2712]"
          onClick={() => router.back()} />
        </div>

        <h1 className="text-text-main text-lg font-bold flex-1 text-center text-[#4F2712]">
          Registrar Despesa
        </h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main">
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-3 flex flex-col gap-6">
        <h1 className="text-[32px] font-bold pt-2 pb-1">Qual é o valor?</h1>

        {/* Valor */}
        <label className="flex flex-col">
          <p className="text-secondary text-base font-medium pb-2">Valor</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            defaultValue="R$ 45,50"
            inputMode="decimal"
            className="form-input w-full rounded-lg bg-subtle-light h-14 p-4 text-2xl font-bold placeholder:text-placeholder-light"
          />
        </label>

        {/* Categoria */}
        <div className="flex items-center gap-4 pt-4 pb-2">
          <h3 className="text-lg font-bold">Categoria</h3>
          <div className="flex-grow h-px bg-secondary/30"></div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`flex h-10 cursor-pointer items-center justify-center gap-x-2 rounded-full pl-3 pr-4 transition-all shadow-sm border
                ${selectedCategory === cat.label
                  ? "bg-secondary text-background-light border-secondary"
                  : "bg-subtle-light border-transparent"}`}
              onClick={() => setSelectedCategory(cat.label)}
            >
              <cat.icon className="w-5 h-5" />
              <p className="text-sm font-medium">{cat.label}</p>
            </div>
          ))}
        </div>

        {/* Subcategoria */}
        <div className="rounded-lg bg-subtle-light p-4">
          <label className="flex flex-col">
            <p className="text-base font-medium pb-2">Subcategoria (opcional)</p>
            <select className="w-full h-14 p-4 rounded-lg bg-background-light">
              {subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Descrição */}
        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Descrição (opcional)</p>
          <input
            type="text"
            placeholder="Ex: Farinha de amêndoas premium"
            defaultValue="Farinha de trigo especial"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light"
          />
        </label>

        {/* Data */}
        <label className="flex flex-col">
          <p className="text-base font-medium pb-2">Data</p>
          <input
            type="text"
            defaultValue="24 de Julho, 2024"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light"
          />
        </label>

        {/* Mais detalhes */}
        <button className="flex items-center gap-2 text-accent-1 font-bold">
          <PlusIcon className="w-5 h-5" />
          Mais detalhes
        </button>

        {/* Fornecedor / Pagamento / Foto */}
        <div className="flex flex-col gap-6 pt-6">
          <label className="flex flex-col">
            <p className="text-base font-medium pb-2">Fornecedor / Loja (opcional)</p>
            <input
              type="text"
              placeholder="Ex: Doce Vida Embalagens"
              className="w-full h-14 p-4 rounded-lg bg-subtle-light"
            />
          </label>

          <label className="flex flex-col">
            <p className="text-base font-medium pb-2">Tipo de Pagamento</p>
            <select className="w-full h-14 p-4 rounded-lg bg-subtle-light">
              {paymentTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>

          <div>
            <p className="text-base font-medium pb-2">Foto do Comprovante (opcional)</p>
            <button className="w-full h-14 rounded-lg border-2 border-dashed border-accent-1/50 bg-subtle-light text-accent-1 font-bold flex items-center justify-center gap-2">
              <CameraIcon className="w-6 h-6" />
              Anexar Foto
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="sticky bottom-0 bg-background-light p-4 pt-2">
        <div className="flex gap-4">
          <button className="flex w-full justify-center rounded-xl bg-background-light h-14 text-primary border text-base font-bold">
            Cancelar
          </button>
          <button className="flex w-full justify-center rounded-xl bg-primary h-14 text-background-light text-base font-bold">
            Salvar
          </button>
        </div>
      </div>
      <MenuInferior />
    </div>
  );
}
