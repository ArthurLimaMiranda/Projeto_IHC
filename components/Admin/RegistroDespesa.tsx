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

    <section className="mt-8 shadow-md rounded-xl bg-white m-5">
      <main className="flex-1 px-4 py-3 flex flex-col gap-6 pt-6">

        {/* Valor */}
        <label className="flex flex-col">
          <p className="text-[#4F2712] font-semibold pb-2 font-xl">Valor</p>
          <input
            type="text"
            placeholder="R$ 0,00"
            defaultValue="R$ 45,50"
            inputMode="decimal"
            className="form-input w-full rounded-lg bg-background-light h-14 p-4 text-md placeholder:text-placeholder-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        {/* Categoria */}
        <div className="flex items-center gap-4">
          <h3 className="text-[#4F2712] font-semibold font-xl">Categoria</h3>
          <div className="flex-grow h-px bg-secondary/30"></div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`flex h-10 cursor-pointer items-center justify-center gap-x-2 rounded-full pl-3 pr-4 transition-all shadow-sm border
                ${selectedCategory === cat.label
                  ? "bg-[#B95760] text-white"
                  : "bg-subtle-light border border-[#B95760] text-[#B95760]"}`}
              onClick={() => setSelectedCategory(cat.label)}
            >
              <cat.icon className="w-5 h-5" />
              <p className="text-sm font-medium">{cat.label}</p>
            </div>
          ))}
        </div>

        {/* Subcategoria */}
        <div className="flex flex-col rounded-lg bg-subtle-light flex flex-col">
            <p className="text-base font-medium pb-2 text-[#4F2712]">Subcategoria (opcional)</p>
            <select className="w-full h-14 p-4 rounded-lg bg-background-light focus:ring-2 focus:ring-[#B95760] focus:outline-none">
              {subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
        </div>

        {/* Descrição */}
        <label className="flex flex-col">
          <p className="text-[#4F2712] font-medium pb-2">Descrição (opcional)</p>
          <input
            type="text"
            placeholder="Ex: Farinha de amêndoas premium"
            defaultValue="Farinha de trigo especial"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        {/* Data */}
        <label className="flex flex-col">
          <p className="text-[#4F2712] font-semibold font-xl pb-2">Data</p>
          <input
            type="date"
            defaultValue="2024-07-24"
            className="w-full h-14 p-4 rounded-lg bg-subtle-light text-[#0A0A0A] focus:ring-2 focus:ring-[#B95760] focus:outline-none"
          />
        </label>

        {/* Fornecedor / Pagamento / Foto */}
        <div className="flex flex-col gap-6 pt-2">
          <label className="flex flex-col">
            <p className="text-base font-medium pb-2 text-[#4F2712]">Fornecedor / Loja (opcional)</p>
            <input
              type="text"
              placeholder="Ex: Doce Vida Embalagens"
              className="w-full h-14 p-4 rounded-lg bg-subtle-light focus:ring-2 focus:ring-[#B95760] focus:outline-none"
            />
          </label>

          <label className="flex flex-col">
            <p className="text-base font-medium pb-2 text-[#4F2712]">Tipo de Pagamento</p>
            <select className="w-full h-14 p-4 rounded-lg bg-background-light focus:ring-2 focus:ring-[#B95760] focus:outline-none">
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
      <div className="sticky bottom-0 p-4 pt-2 m-12">
        <div className="flex gap-4 items-center justify-center">
          <button className="flex w-full justify-center items-center rounded-xl h-14 text-primary border text-base font-bold">
            Cancelar
          </button>
          <button className="flex w-full justify-center rounded-xl items-center bg-primary h-14 text-background-light text-base font-bold">
            Salvar
          </button>
        </div>
      </div>
      <MenuInferior />
    </section>
    </div>
  );
}
