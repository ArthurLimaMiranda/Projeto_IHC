"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import MenuInferior from "./MenuInferior";

export default function HistoricoPedidosPage() {
  const router = useRouter();

  // --------------------------------------------------------
  // MOCK DATA (constante inicial)
  // --------------------------------------------------------
  const initialOrders = [
    { id: 1020, client: "João", deliveryDate: "20/12/23", price: 150.0, description: "Bolo grande com recheio de chocolate", image: "https://picsum.photos/200?4", status: "em-producao" },
    { id: 1021, client: "Maria", deliveryDate: "18/12/23", price: 230.0, description: "50 cupcakes personalizados", image: "https://picsum.photos/200?5", status: "concluido" },
    { id: 1022, client: "Ana", deliveryDate: "15/12/23", price: 90.0, description: "Kit festa simples", image: "https://picsum.photos/200?6", status: "entregue" },
    { id: 1023, client: "Ricardo", deliveryDate: "12/12/23", price: 180.0, description: "Mini kit festa", image: "https://picsum.photos/200?7", status: "concluido" },
    { id: 1024, client: "Bruna", deliveryDate: "10/12/23", price: 260.0, description: "Bolo 3 andares", image: "https://picsum.photos/200?8", status: "entregue" },
    { id: 1025, client: "Clara", deliveryDate: "08/12/23", price: 110.0, description: "Bolo simples", image: "https://picsum.photos/200?9", status: "entregue" },
  ];

  // --------------------------------------------------------
  // STATE: orders é a fonte da verdade
  // --------------------------------------------------------
  const [orders, setOrders] = useState(initialOrders);

  // --------------------------------------------------------
  // PENDINGS CAROUSEL (horizontal)
  // --------------------------------------------------------
  const pendRef = useRef(null);
  const [pendWidth, setPendWidth] = useState(0);
  const [pendIndex, setPendIndex] = useState(0);

  // recalcula pendWidth quando o container ou orders mudam
  useEffect(() => {
    const update = () => {
      if (pendRef.current) {
        // @ts-ignore
        setPendWidth(Math.max(0, pendRef.current.scrollWidth - pendRef.current.offsetWidth));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [orders]); // <- depende de orders para recalcular caso a lista de pendentes mude

  // derive pendingDeliveries a partir de orders (não mais allOrders)
  const pendingDeliveries = orders
    .filter(order => order.status !== "concluido" && order.status !== "entregue")
    .map(order => ({
      id: order.id,
      title: order.description,
      date: order.deliveryDate,
      image: order.image
    }));

  // quando pendingDeliveries mudar, garanta pendIndex válido
  useEffect(() => {
    if (pendingDeliveries.length === 0) {
      setPendIndex(0);
      return;
    }
    setPendIndex(prev => Math.min(prev, Math.max(0, pendingDeliveries.length - 1)));
  }, [pendingDeliveries.length]);

  const PEND_ITEM_WIDTH = 304; // largura estimada (min-w + margin)
  const pendGetX = () => -pendIndex * PEND_ITEM_WIDTH;

  const handlePendDragEnd = (e, info) => {
    if (pendingDeliveries.length <= 1) return;
    const threshold = 80;
    if (info.offset.x > threshold) {
      // swipe direito -> anterior
      setPendIndex((prev) => (prev === 0 ? pendingDeliveries.length - 1 : prev - 1));
    } else if (info.offset.x < -threshold) {
      // swipe esquerdo -> próximo
      setPendIndex((prev) => (prev + 1) % pendingDeliveries.length);
    }
  };

  const goToPend = (i) => setPendIndex(i);
  const pendPrev = () => setPendIndex((p) => (p === 0 ? Math.max(0, pendingDeliveries.length - 1) : p - 1));
  const pendNext = () => setPendIndex(p => (pendingDeliveries.length === 0 ? 0 : (p + 1) % pendingDeliveries.length));

  // --------------------------------------------------------
  // TODOS OS PEDIDOS - vertical pagination (ITEMS_PER_PAGE)
  // --------------------------------------------------------
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.max(1, Math.ceil(orders.length / ITEMS_PER_PAGE));

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Se orders mudar e reduzir o número de páginas, ajustar page
  useEffect(() => {
    setPage(prev => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setPage((prev) => Math.min(Math.max(prev + newDirection, 0), totalPages - 1));
  };

  // derive currentItems a partir de orders (não mais allOrders)
  const currentItems = orders.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  // variants para slide vertical (mantive igual)
  const variants = {
    enter: (dir) => ({ y: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  // --------------------------------------------------------
  // SelectStatus (comportamento: atualiza orders via onChange)
  // --------------------------------------------------------
  function SelectStatus({ status, onChange }) {
    const [open, setOpen] = useState(false);

    const options = [
      { id: "em-producao", label: "Em Produção", color: "bg-[#C9A227]" },
      { id: "concluido", label: "Concluído", color: "bg-[#3BB885]" },
      { id: "entregue", label: "Entregue", color: "bg-[#B95760]" },
    ];

    const current = options.find((o) => o.id === status) || options[0];

    return (
      <div className="relative">
        {/* BOTÃO PRINCIPAL */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white ${current.color}`}
        >
          {current.label}
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        {/* MENU DROPDOWN */}
        {open && (
          <div className="absolute left-0 mt-2 z-50 bg-white border rounded-xl shadow-xl w-40">
            {options.map((op) => (
              <button
                key={op.id}
                onClick={() => {
                  onChange(op.id);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
              >
                {op.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#FFFFF4] overflow-hidden">
      {/* TOP BAR */}
      <header className="flex items-center bg-[#EEEDDF] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-text-main">
          <ArrowLeftIcon
            className="w-7 h-7 cursor-pointer text-[#4F2712]"
            onClick={() => router.back()}
          />
        </div>

        <h1 className="text-text-main text-lg font-bold flex-1 text-center text-[#4F2712]">
          Histórico de Pedidos
        </h1>

        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main">
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* --------------------------------------------------------
         ENTREGAS PENDENTES — CARROSSEL HORIZONTAL (drag + arrows + dots)
      --------------------------------------------------------- */}
      <h2 className="text-lg font-bold px-4 pb-2 pt-6 text-[#4F2712]">
        Próximas Entregas
      </h2>

      <div className="px-4">
        <div className="relative">
          {/* arrows */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={pendPrev}
              className="bg-white shadow-md p-2 rounded-full -ml-1"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5 text-[#4F2712]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={pendNext}
              className="bg-white shadow-md p-2 rounded-full -mr-1"
              aria-label="Próximo"
            >
              <svg className="w-5 h-5 text-[#4F2712]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* carrossel */}
          <motion.div
            className="cursor-grab overflow-hidden"
            whileTap={{ cursor: "grabbing" }}
            ref={pendRef}
          >
            <motion.div
              className="flex items-stretch py-3"
              drag="x"
              dragConstraints={{ right: 0, left: -pendWidth }}
              onDragEnd={handlePendDragEnd}
              animate={{ x: pendGetX() }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {pendingDeliveries.map((item, idx) => (
                <div
                  key={item.id}
                  className="min-w-[280px] max-w-[280px] mx-3 flex-shrink-0"
                >
                  <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow-sm border border-[#B95760]">
                    <div
                      className="w-full aspect-video rounded-lg overflow-hidden bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div>
                      <p className="text-brand-brown text-base font-bold">Pedido #{item.id}</p>
                      <p className="text-brand-brown/70 text-sm">{item.title}</p>
                      <p className="text-brand-rose text-sm font-bold mt-1">Entrega: {item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* dots */}
          <div className="flex justify-center mt-3">
            <div className="flex gap-2">
              {pendingDeliveries.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPend(i)}
                  aria-label={`Ir para slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === pendIndex ? "w-6 bg-[#B95760]" : "w-2 bg-[#D9D9D9]"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------
        TODOS OS PEDIDOS — LISTA VERTICAL PAGINADA (slide vertical)
      --------------------------------------------------------- */}
      <h2 className="text-[#4F2712] text-lg font-bold px-4 pb-2 pt-4">
        Todos os Pedidos
      </h2>

      <div className="relative h-[520px] overflow-hidden px-4">
        {/* CONTAINER ANIMADO */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.y < -120) paginate(1);     // arrastou para cima → próxima página
              else if (info.offset.y > 120) paginate(-1); // arrastou para baixo → volta página
            }}
            className="absolute top-0 left-0 w-full"
          >
            <div className="flex flex-col gap-3 pb-16 p-4">
              {currentItems.map((order) => (
                <div key={order.id} className="flex flex-col gap-3 bg-white p-3 rounded-xl shadow-md">
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                      <div
                        className="size-16 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${order.image})` }}
                      />
                      <div className="flex flex-col">
                        <p className="text-[#B95760] text-base font-bold">
                          #{order.id} - {order.client}
                        </p>
                        <p className="text-brand-brown/70 text-sm">
                          Entrega: {order.deliveryDate} - R$ {order.price}
                        </p>
                        <p className="text-brand-brown/70 text-sm truncate max-w-48">
                          {order.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRightIcon className="w-5 h-5 text-brand-brown/50" />
                  </div>

                  {/* STATUS */}
                  <div className="flex items-center justify-start pt-2 pl-4 border-t border-brand-brown/10">
                    <SelectStatus
                      status={order.status}
                      onChange={(novoStatus) => {
                        setOrders((prev) =>
                          prev.map((o) =>
                            o.id === order.id ? { ...o, status: novoStatus } : o
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    {/* PAGINADOR FIXO — SEMPRE VISÍVEL */}
    <div className="flex items-center justify-center gap-4 mb-20">
      <button
        className="px-3 py-1 text-lg font-bold text-brand-brown disabled:opacity-30 bg-white rounded-md shadow-sm"
        onClick={() => paginate(-1)}
        disabled={page === 0}
        aria-label="Página anterior"
      >
        {"<"}
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > page ? 1 : -1);
              setPage(i);
            }}
            aria-label={`Ir para página ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === page ? "w-6 bg-[#B95760]" : "w-2 bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>

      <button
        className="px-3 py-1 text-lg font-bold text-brand-brown disabled:opacity-30 bg-white rounded-md shadow-sm"
        onClick={() => paginate(1)}
        disabled={page === totalPages - 1}
        aria-label="Próxima página"
      >
        {">"}
      </button>
    </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-rose text-white shadow-lg hover:scale-105 transition-transform">
        +
      </button>

      <MenuInferior />
    </div>
  );
}
