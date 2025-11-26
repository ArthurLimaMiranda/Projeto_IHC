"use client";
import React, { useState, useMemo } from "react";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MenuInferior from "./MenuInferior";

export default function GerenciarEstoque() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  const itens = [
    { nome: "Farinha de Trigo", quantidade: "15 kg", status: "primary", categoria: "Ingredientes" },
    { nome: "Chocolate em Pó 50%", quantidade: "2 kg", status: "low", categoria: "Ingredientes" },
    { nome: "Caixa para Bolo (20cm)", quantidade: "35 unidades", status: "primary", categoria: "Embalagens" },
    { nome: "Ovos", quantidade: "0 unidades", status: "out", categoria: "Ingredientes" },
    { nome: "Leite Condensado", quantidade: "5 unidades", status: "low", categoria: "Ingredientes" },
  ];

  const categorias = ["Todos", "Ingredientes", "Embalagens"]; 

  const itensFiltrados = useMemo(() => {
    return itens.filter((item) => {
      const correspondeCategoria =
        categoriaSelecionada === "Todos" ||
        item.categoria === categoriaSelecionada;

      const correspondeBusca = item.nome
        .toLowerCase()
        .includes(search.toLowerCase());

      return correspondeCategoria && correspondeBusca;
    });
  }, [search, categoriaSelecionada]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-text-primary">

      {/* Top Bar */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon className="w-7 h-7 cursor-pointer text-[#4F2712]"
          onClick={() => router.back()} />
        </div>

        <h1 className="text-text-main text-lg font-bold flex-1 text-center text-[#4F2712]">
          Gerenciar Estoque
        </h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main">
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex flex-col flex-1 px-4 pt-2 pb-24">

        {/* Barra de Busca */}
        <div className="py-3">
          <label className="relative w-full block h-12">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              placeholder="Buscar item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input w-full h-full rounded-lg bg-surface-muted text-text-primary placeholder:text-text-secondary pl-10 pr-3 focus:outline-0 focus:ring-0"
            />
          </label>
        </div>

        {/* Categorias */}
        <div className="flex gap-3 pt-1 pb-4 overflow-x-auto">
          {categorias.map((cat) => (
            <div
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`flex h-9 items-center justify-center px-4 rounded-full cursor-pointer whitespace-nowrap transition
                ${categoriaSelecionada === cat ? "bg-primary text-white" : "bg-surface-muted text-text-primary"}
              `}
            >
              <p className="text-sm font-medium">{cat}</p>
            </div>
          ))}
        </div>

        {/* Lista de Itens */}
        <div className="flex flex-col gap-3">
          {itensFiltrados.map((item, index) => (
            <Item key={index} {...item} />
          ))}
        </div>
      </main>

      {/* Botão Flutuante */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          aria-label="Adicionar novo item"
          className="flex items-center justify-center size-14 bg-accent-low-stock rounded-full shadow-lg text-white"
        >
          <PlusIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

function Item({ nome, quantidade, status }) {
  const statusColor = {
    primary: "bg-primary",
    low: "bg-accent-low-stock",
    out: "bg-accent-out-of-stock",
  }[status];

  return (
    <div className="flex items-center gap-4 bg-surface p-3 rounded-xl cursor-pointer shadow-sm">
      <div className={`w-1.5 h-12 rounded-full ${statusColor}`} />

      <div className="flex flex-col flex-1">
        <p className="text-base font-medium line-clamp-1">{nome}</p>
        <p className="text-sm text-text-secondary line-clamp-2">{quantidade}</p>
      </div>

      <div className="shrink-0 text-text-secondary flex size-7 items-center justify-center">
        <ChevronRightIcon className="w-5 h-5" />
      </div>
       <MenuInferior />
    </div>
  );
}
