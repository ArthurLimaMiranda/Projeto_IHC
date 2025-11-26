"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MenuInferior from "./MenuInferior";

// Interfaces para tipagem
interface EstoqueItem {
  id: number;
  nome: string;
  quantidade: string;
  status: "primary" | "low" | "out";
  categoria: string;
}

interface ItemProps {
  nome: string;
  quantidade: string;
  status: "primary" | "low" | "out";
  onEdit: () => void;
  onDelete: () => void;
}

// Componente Item separado com tipagem
function Item({ nome, quantidade, status, onEdit, onDelete }: ItemProps) {
  const statusColor = {
    primary: "bg-[#34A7B2]",
    low: "bg-yellow-500",
    out: "bg-red-500",
  }[status];

  return (
    <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm">
      <div className={`w-1.5 h-12 rounded-full ${statusColor}`} />

      <div className="flex flex-col flex-1">
        <p className="font-medium text-[#4F2712]">{nome}</p>
        <p className="text-sm text-gray-600">{quantidade}</p>
      </div>

      <button onClick={onEdit} className="text-blue-500">
        <PencilIcon className="w-6 h-6" />
      </button>

      <button onClick={onDelete} className="text-red-500">
        <TrashIcon className="w-6 h-6" />
      </button>

      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </div>
  );
}

export default function GerenciarEstoque() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [itens, setItens] = useState<EstoqueItem[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Estados para modais
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Estados para formulários
  const [novoNome, setNovoNome] = useState("");
  const [novaQtd, setNovaQtd] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("Ingredientes");
  const [novaUnidade, setNovaUnidade] = useState("kg");

  const [editItem, setEditItem] = useState<EstoqueItem | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editQtd, setEditQtd] = useState("");
  const [editCategoria, setEditCategoria] = useState("");
  const [editUnidade, setEditUnidade] = useState("");

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const categorias = ["Todos", "Ingredientes", "Embalagens"];

  // Carregar itens do localStorage
  useEffect(() => {
    const carregarEstoque = () => {
      try {
        const saved = localStorage.getItem("estoque");
        if (saved) {
          const parsedData = JSON.parse(saved);
          setItens(parsedData);
        } else {
          // Itens padrão para primeira execução
          const itensPadrao: EstoqueItem[] = [
            { id: 1, nome: "Farinha de Trigo", quantidade: "15 kg", status: "primary", categoria: "Ingredientes" },
            { id: 2, nome: "Chocolate em Pó 50%", quantidade: "2 kg", status: "low", categoria: "Ingredientes" },
            { id: 3, nome: "Caixa para Bolo (20cm)", quantidade: "35 unidades", status: "primary", categoria: "Embalagens" },
            { id: 4, nome: "Ovos", quantidade: "0 unidades", status: "out", categoria: "Ingredientes" },
            { id: 5, nome: "Leite Condensado", quantidade: "5 unidades", status: "low", categoria: "Ingredientes" },
          ];
          setItens(itensPadrao);
          localStorage.setItem("estoque", JSON.stringify(itensPadrao));
        }
      } catch (error) {
        console.error("Erro ao carregar estoque:", error);
      }
    };

    carregarEstoque();
  }, []);

  // Salvar itens no localStorage quando houver mudanças
  useEffect(() => {
    if (itens.length > 0) {
      localStorage.setItem("estoque", JSON.stringify(itens));
    }
  }, [itens]);

  // Filtrar itens
  const itensFiltrados = useMemo(() => {
    return itens.filter((item) => {
      const catOK = categoriaSelecionada === "Todos" || item.categoria === categoriaSelecionada;
      const buscaOK = item.nome.toLowerCase().includes(search.toLowerCase());
      return catOK && buscaOK;
    });
  }, [search, categoriaSelecionada, itens]);

  // Funções do modal de adicionar
  const abrirModal = () => setShowModal(true);
  
  const fecharModal = () => {
    setShowModal(false);
    setNovoNome("");
    setNovaQtd("");
    setNovaCategoria("Ingredientes");
    setNovaUnidade("kg");
  };

  const salvarNovoItem = () => {
    if (!novoNome.trim()) {
      alert("Digite um nome.");
      return;
    }
    if (!novaQtd.trim()) {
      alert("Digite a quantidade.");
      return;
    }

    const novoItem: EstoqueItem = {
      id: Date.now(),
      nome: novoNome,
      quantidade: `${novaQtd} ${novaUnidade}`,
      categoria: novaCategoria,
      status: "primary", // Novo item começa como "primary"
    };

    setItens((old) => [...old, novoItem]);
    fecharModal();
    setSuccessMessage("Item adicionado com sucesso!");
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 1500);
  };

  // Funções do modal de editar
  const abrirModalEditar = (item: EstoqueItem) => {
    setEditItem(item);
    // Separar quantidade e unidade (ex: "15 kg" -> ["15", "kg"])
    const partes = item.quantidade.split(" ");
    const qtd = partes[0];
    const unidade = partes.slice(1).join(" ");

    setEditNome(item.nome);
    setEditQtd(qtd);
    setEditCategoria(item.categoria);
    setEditUnidade(unidade);
    setShowEditModal(true);
  };

  const salvarEdicao = () => {
    if (!editItem) return;

    setItens((old) =>
      old.map((item) =>
        item.id === editItem.id
          ? {
              ...item,
              nome: editNome,
              quantidade: `${editQtd} ${editUnidade}`,
              categoria: editCategoria,
            }
          : item
      )
    );
    setShowEditModal(false);
    setSuccessMessage("Item editado com sucesso!");
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 1500);
  };

  // Funções do modal de excluir
  const abrirModalExcluir = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmarExclusao = () => {
    if (deleteId) {
      setItens((old) => old.filter((item) => item.id !== deleteId));
      setShowDeleteModal(false);
      setSuccessMessage("Item removido com sucesso!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 1500);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#FFFFF4] text-[#4F2712]">
      {/* Topo */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <ArrowLeftIcon
          className="w-7 h-7 cursor-pointer text-[#4F2712]"
          onClick={() => router.back()}
        />
        <h1 className="text-lg font-bold text-[#4F2712]">Gerenciar Estoque</h1>
        <QuestionMarkCircleIcon className="w-7 h-7 text-[#4F2712]" />
      </header>

      {/* Conteúdo */}
      <main className="flex flex-col flex-1 px-4 pt-2 pb-24">
        {/* Busca */}
        <div className="py-3">
          <label className="relative block h-12">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Buscar item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full rounded-lg bg-white border border-gray-300 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
            />
          </label>
        </div>

        {/* Categorias */}
        <div className="flex gap-3 pb-4 overflow-x-auto">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`px-4 h-9 flex items-center rounded-full cursor-pointer whitespace-nowrap transition-colors ${
                categoriaSelecionada === cat
                  ? "bg-[#34A7B2] text-white"
                  : "bg-white text-[#4F2712] border border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de Itens */}
        <div className="flex flex-col gap-3">
          {itensFiltrados.length > 0 ? (
            itensFiltrados.map((item) => (
              <Item
                key={item.id}
                nome={item.nome}
                quantidade={item.quantidade}
                status={item.status}
                onEdit={() => abrirModalEditar(item)}
                onDelete={() => abrirModalExcluir(item.id)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum item encontrado</p>
            </div>
          )}
        </div>
      </main>

      {/* Botão Adicionar */}
      <button
        onClick={abrirModal}
        className="fixed bottom-24 right-6 size-14 rounded-full bg-[#34A7B2] text-white flex items-center justify-center shadow-lg hover:bg-[#2B8D99] transition-colors"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      <MenuInferior />

      {/* Modal Adicionar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4 text-[#4F2712]">Adicionar Item</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#4F2712]">Nome</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Ex: Farinha de Trigo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#4F2712]">Categoria</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
                  value={novaCategoria}
                  onChange={(e) => setNovaCategoria(e.target.value)}
                >
                  <option value="Ingredientes">Ingredientes</option>
                  <option value="Embalagens">Embalagens</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#4F2712]">Quantidade</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
                    value={novaQtd}
                    onChange={(e) => setNovaQtd(e.target.value)}
                    placeholder="Ex: 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[#4F2712]">Unidade</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
                    value={novaUnidade}
                    onChange={(e) => setNovaUnidade(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="L">L</option>
                    <option value="unidades">unidades</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={fecharModal}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={salvarNovoItem}
                className="px-4 py-2 rounded-lg bg-[#34A7B2] text-white hover:bg-[#2B8D99] transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4 text-[#4F2712]">Editar Item</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#4F2712]">Nome</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#4F2712]">Categoria</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
                  value={editCategoria}
                  onChange={(e) => setEditCategoria(e.target.value)}
                >
                  <option value="Ingredientes">Ingredientes</option>
                  <option value="Embalagens">Embalagens</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#4F2712]">Quantidade</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
                    value={editQtd}
                    onChange={(e) => setEditQtd(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[#4F2712]">Unidade</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A7B2]"
                    value={editUnidade}
                    onChange={(e) => setEditUnidade(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="L">L</option>
                    <option value="unidades">unidades</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                className="px-4 py-2 rounded-lg bg-[#34A7B2] text-white hover:bg-[#2B8D99] transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Excluir */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl">
            <h2 className="text-lg font-bold text-center text-[#4F2712]">Excluir item?</h2>
            <p className="mt-3 text-center text-sm text-gray-600">
              Esta ação não pode ser desfeita.
            </p>

            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarExclusao}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl text-center">
            <h2 className="text-lg font-bold text-green-600">Sucesso!</h2>
            <p className="mt-3 text-gray-700">{successMessage}</p>
            <button
              className="w-full mt-6 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}