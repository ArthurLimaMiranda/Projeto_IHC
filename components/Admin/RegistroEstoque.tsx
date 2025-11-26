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

export default function GerenciarEstoque() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

// Lista persistente
const [itens, setItens] = useState([]);

// Carregar ao iniciar
useEffect(() => {
  const saved = localStorage.getItem("estoque");

  if (saved) {
    setItens(JSON.parse(saved));
  } else {
    // Carrega itens padrão apenas na primeira vez
    const itensPadrao = [
      { id: 1, nome: "Farinha de Trigo", quantidade: "15 kg", status: "primary", categoria: "Ingredientes" },
      { id: 2, nome: "Chocolate em Pó 50%", quantidade: "2 kg", status: "low", categoria: "Ingredientes" },
      { id: 3, nome: "Caixa para Bolo (20cm)", quantidade: "35 unidades", status: "primary", categoria: "Embalagens" },
      { id: 4, nome: "Ovos", quantidade: "0 unidades", status: "out", categoria: "Ingredientes" },
      { id: 5, nome: "Leite Condensado", quantidade: "5 unidades", status: "low", categoria: "Ingredientes" },
    ];

    setItens(itensPadrao);
    localStorage.setItem("estoque", JSON.stringify(itensPadrao));
  }
}, []);

// Salvar sempre que alterar
useEffect(() => {
  if (itens.length > 0) {
    localStorage.setItem("estoque", JSON.stringify(itens));
  }
}, [itens]);


  const categorias = ["Todos", "Ingredientes", "Embalagens"];

  // -------------------
  // MODAL DE ADICIONAR
  // -------------------
  const [showModal, setShowModal] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novaQtd, setNovaQtd] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("Ingredientes");
  const [novaUnidade, setNovaUnidade] = useState("kg");

  const abrirModal = () => setShowModal(true);
  const fecharModal = () => {
    setShowModal(false);
    setNovoNome("");
    setNovaQtd("");
    setNovaCategoria("Ingredientes");
    setNovaUnidade("kg");
  };

  const salvarNovoItem = () => {
    if (!novoNome.trim()) return alert("Digite um nome.");
    if (!novaQtd.trim()) return alert("Digite a quantidade.");

    setItens((old) => [
      ...old,
      {
        id: Date.now(),
        nome: novoNome,
        quantidade: `${novaQtd} ${novaUnidade}`,
        categoria: novaCategoria,
        status: "primary",
      },
    ]);

    fecharModal();
    setSuccessMessage("Item adicionado com sucesso!");
    setShowSuccessModal(true);

// Fecha automaticamente após 1.5s
setTimeout(() => setShowSuccessModal(false), 1500);
  };

  // -----------------------------------
  // EDITAR & DELETAR (mantém como antes)
  // -----------------------------------
  const editarItem = (id) => {
    const item = itens.find((i) => i.id === id);
    if (!item) return;

    const nome = prompt("Novo nome:", item.nome) ?? item.nome;
    const quantidade = prompt("Nova quantidade:", item.quantidade) ?? item.quantidade;
    const categoria = prompt("Categoria:", item.categoria) ?? item.categoria;

    setItens((old) =>
      old.map((i) =>
        i.id === id ? { ...i, nome, quantidade, categoria } : i
      )
    );
  };

  const deletarItem = (id) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      setItens((old) => old.filter((i) => i.id !== id));
    }
  };

  // -------------------
// MODAL DE EDITAR
// -------------------
const [showEditModal, setShowEditModal] = useState(false);
const [editItem, setEditItem] = useState(null);
const [editNome, setEditNome] = useState("");
const [editQtd, setEditQtd] = useState("");
const [editCategoria, setEditCategoria] = useState("");
const [editUnidade, setEditUnidade] = useState("");

// abrir modal editar
const abrirModalEditar = (item) => {
  setEditItem(item);
  const [qtd, unidade] = item.quantidade.split(" ");

  setEditNome(item.nome);
  setEditQtd(qtd);
  setEditCategoria(item.categoria);
  setEditUnidade(unidade);
  setShowEditModal(true);
};

const salvarEdicao = () => {
  setItens((old) =>
    old.map((i) =>
      i.id === editItem.id
        ? {
            ...i,
            nome: editNome,
            quantidade: `${editQtd} ${editUnidade}`,
            categoria: editCategoria,
          }
        : i
    )
  );
  setShowEditModal(false);
};

// -------------------
// MODAL EXCLUIR
// -------------------
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState(null);

const abrirModalExcluir = (id) => {
  setDeleteId(id);
  setShowDeleteModal(true);
};

const confirmarExclusao = () => {
  setItens((old) => old.filter((i) => i.id !== deleteId));
  setShowDeleteModal(false);
  setSuccessMessage("Item removido com sucesso!");
  setShowSuccessModal(true);

  setTimeout(() => setShowSuccessModal(false), 1500);
};


  // Filtros
  const itensFiltrados = useMemo(() => {
    return itens.filter((item) => {
      const catOK =
        categoriaSelecionada === "Todos" ||
        item.categoria === categoriaSelecionada;

      const buscaOK = item.nome.toLowerCase().includes(search.toLowerCase());

      return catOK && buscaOK;
    });
  }, [search, categoriaSelecionada, itens]);

    // MODAL DE SUCESSO
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  return (
    <div className="relative flex min-h-screen flex-col bg-background-light text-text-primary">

      {/* Topo */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <ArrowLeftIcon
          className="w-7 h-7 cursor-pointer text-[#4F2712]"
          onClick={() => router.back()}
        />
        <h1 className="text-lg font-bold text-[#4F2712]">Gerenciar Estoque</h1>
        <QuestionMarkCircleIcon className="w-7 h-7" />
      </header>

      {/* Conteúdo */}
      <main className="flex flex-col flex-1 px-4 pt-2 pb-24">

        {/* Busca */}
        <div className="py-3">
          <label className="relative block h-12">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              placeholder="Buscar item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full rounded-lg bg-surface-muted pl-10 pr-3"
            />
          </label>
        </div>

        {/* Categorias */}
        <div className="flex gap-3 pb-4 overflow-x-auto">
          {categorias.map((cat) => (
            <div
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`px-4 h-9 flex items-center rounded-full cursor-pointer ${
                categoriaSelecionada === cat
                  ? "bg-primary text-white"
                  : "bg-surface-muted"
              }`}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-3">
          {itensFiltrados.map((item) => (
            <Item
              key={item.id}
              {...item}
              onEdit={() => abrirModalEditar(item)}
              onDelete={() => abrirModalExcluir(item.id)}
            />
          ))}
        </div>
      </main>

      {/* Botão Adicionar */}
      <button
        onClick={abrirModal}
        className="fixed bottom-6 mb-20 bg-[#34A7B2] right-6 size-14 rounded-full bg-accent-low-stock text-white flex items-center justify-center"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      <MenuInferior />

      {/* ----------------------- */}
      {/*      MODAL ADICIONAR     */}
      {/* ----------------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-md rounded-2xl p-5 shadow-xl">

            <h2 className="text-lg font-bold mb-4">Adicionar Item</h2>

            {/* Nome */}
            <label className="block mb-3">
              <p className="text-sm font-medium mb-1">Nome</p>
              <input
                className="w-full p-2 border rounded-lg"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Ex: Farinha de Trigo"
              />
            </label>

            {/* Categoria */}
            <label className="block mb-3">
              <p className="text-sm font-medium mb-1">Categoria</p>
              <select
                className="w-full p-2 border rounded-lg"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
              >
                <option>Ingredientes</option>
                <option>Embalagens</option>
              </select>
            </label>

            {/* Quantidade */}
            <label className="block mb-3">
              <p className="text-sm font-medium mb-1">Quantidade</p>
              <input
                className="w-full p-2 border rounded-lg"
                value={novaQtd}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                  setNovaQtd(onlyNumbers);
                }}
                placeholder="Ex: 3"
              />
            </label>

            {/* Unidade */}
            <label className="block mb-4">
              <p className="text-sm font-medium mb-1">Unidade</p>
              <select
                className="w-full p-2 border rounded-lg"
                value={novaUnidade}
                onChange={(e) => setNovaUnidade(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="L">L</option>
                <option value="unidades">unidades</option>
                <option value="g">g</option>
                <option value="ml">ml</option>
              </select>
            </label>

            {/* Botões */}
            <div className="flex justify-end gap-3">
              <button
                onClick={fecharModal}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={salvarNovoItem}
                className="px-4 py-2 rounded-lg bg-primary text-white"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------- */}
      {/*      MODAL EDITAR       */}
      {/* ----------------------- */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-md rounded-2xl p-5 shadow-xl">

            <h2 className="text-lg font-bold mb-4">Editar Item</h2>

            {/* Nome */}
            <label className="block mb-3">
              <p className="text-sm font-medium mb-1">Nome</p>
              <input
                className="w-full p-2 border rounded-lg"
                value={editNome}
                onChange={(e) => setEditNome(e.target.value)}
              />
            </label>

            {/* Categoria */}
            <label className="block mb-3">
              <p className="text-sm font-medium mb-1">Categoria</p>
              <select
                className="w-full p-2 border rounded-lg"
                value={editCategoria}
                onChange={(e) => setEditCategoria(e.target.value)}
              >
                <option>Ingredientes</option>
                <option>Embalagens</option>
              </select>
            </label>

            {/* Quantidade */}
            <label className="block mb-3">
              <p className="text-sm font-medium mb-1">Quantidade</p>
              <input
                className="w-full p-2 border rounded-lg"
                value={editQtd}
                onChange={(e) => setEditQtd(e.target.value)}
              />
            </label>

            {/* Unidade */}
            <label className="block mb-4">
              <p className="text-sm font-medium mb-1">Unidade</p>
              <select
                className="w-full p-2 border rounded-lg"
                value={editUnidade}
                onChange={(e) => setEditUnidade(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="L">L</option>
                <option value="unidades">unidades</option>
                <option value="g">g</option>
                <option value="ml">ml</option>
              </select>
            </label>

            {/* Botões */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Cancelar
              </button>

              <button
                onClick={salvarEdicao}
                className="px-4 py-2 rounded-lg bg-primary text-white"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------- */}
      {/*      MODAL EXCLUIR      */}
      {/* ----------------------- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-10/12 max-w-sm p-6 rounded-xl shadow-xl">

            <h2 className="text-lg font-bold text-center">Excluir item?</h2>
            <p className="mt-3 text-center text-sm text-gray-600">
              Esta ação não pode ser desfeita.
            </p>

            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarExclusao}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------- */}
      {/*     MODAL SUCESSO       */}
      {/* ----------------------- */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-10/12 max-w-sm p-6 rounded-xl shadow-xl text-center">

            <h2 className="text-lg font-bold text-green-600">Sucesso!</h2>
            <p className="mt-3 text-gray-700">{successMessage}</p>

            <button
              className="w-full mt-6 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold"
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

// ---------------------
// COMPONENTE ITEM
// ---------------------
function Item({ nome, quantidade, status, onEdit, onDelete }) {
  const statusColor = {
    primary: "bg-primary",
    low: "bg-accent-low-stock",
    out: "bg-accent-out-of-stock",
  }[status];

  return (
    <div className="flex items-center gap-4 bg-surface p-3 rounded-xl shadow-sm">
      <div className={`w-1.5 h-12 rounded-full ${statusColor}`} />

      <div className="flex flex-col flex-1">
        <p className="font-medium">{nome}</p>
        <p className="text-sm text-text-secondary">{quantidade}</p>
      </div>

      <button onClick={onEdit} className="text-blue-500">
        <PencilIcon className="w-6 h-6" />
      </button>

      <button onClick={onDelete} className="text-red-500">
        <TrashIcon className="w-6 h-6" />
      </button>

      <ChevronRightIcon className="w-5 h-5 text-text-secondary" />
    </div>
  );
}
