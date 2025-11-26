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
  CakeIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import MenuInferior from "./MenuInferior";

export default function HistoricoPedidosPage() {
  const router = useRouter();

  // --------------------------------------------------------
  // STATE: orders é a fonte da verdade - agora busca do localStorage
  // --------------------------------------------------------
  const [orders, setOrders] = useState([]);

  // Carregar pedidos do localStorage
  useEffect(() => {
    const carregarPedidos = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
        
        const formattedOrders = savedOrders.map(order => ({
          id: order.id,
          client: order.customer.name,
          deliveryDate: formatarDataEntrega(order.estimatedDelivery),
          price: order.total,
          description: order.items.map(item => item.name).join(', '),
          image: order.items[0]?.image || 'https://picsum.photos/200?4',
          status: order.status,
          orderData: order // Manter dados completos para referência
        }));

        // Ordenar por data de entrega (mais recente primeiro)
        formattedOrders.sort((a, b) => new Date(b.orderData.estimatedDelivery) - new Date(a.orderData.estimatedDelivery));
        
        setOrders(formattedOrders);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    };

    carregarPedidos();
    
    // Listen for storage changes
    const handleStorageChange = () => carregarPedidos();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatarDataEntrega = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // --------------------------------------------------------
  // PENDINGS CAROUSEL (horizontal)
  // --------------------------------------------------------
  const pendRef = useRef(null);
  const [pendWidth, setPendWidth] = useState(0);
  const [pendIndex, setPendIndex] = useState(0);

  // Recalcular width quando orders mudarem
  useEffect(() => {
    const update = () => {
      if (pendRef.current) {
        setPendWidth(Math.max(0, pendRef.current.scrollWidth - pendRef.current.offsetWidth));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [orders]);

  // Pedidos pendentes para o carrossel
  const pendingDeliveries = orders
    .filter(order => order.status !== "DELIVERED")
    .map(order => ({
      id: order.id,
      title: order.description,
      date: order.deliveryDate,
      image: order.image,
      status: order.status
    }));

  // Ajustar índice quando pendingDeliveries mudar
  useEffect(() => {
    if (pendingDeliveries.length === 0) {
      setPendIndex(0);
      return;
    }
    setPendIndex(prev => Math.min(prev, Math.max(0, pendingDeliveries.length - 1)));
  }, [pendingDeliveries.length]);

  const PEND_ITEM_WIDTH = 304;
  const pendGetX = () => -pendIndex * PEND_ITEM_WIDTH;

  const handlePendDragEnd = (e, info) => {
    if (pendingDeliveries.length <= 1) return;
    const threshold = 80;
    if (info.offset.x > threshold) {
      setPendIndex((prev) => (prev === 0 ? pendingDeliveries.length - 1 : prev - 1));
    } else if (info.offset.x < -threshold) {
      setPendIndex((prev) => (prev + 1) % pendingDeliveries.length);
    }
  };

  const goToPend = (i) => setPendIndex(i);
  const pendPrev = () => setPendIndex((p) => (p === 0 ? Math.max(0, pendingDeliveries.length - 1) : p - 1));
  const pendNext = () => setPendIndex(p => (pendingDeliveries.length === 0 ? 0 : (p + 1) % pendingDeliveries.length));

  // --------------------------------------------------------
  // TODOS OS PEDIDOS - vertical pagination
  // --------------------------------------------------------
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.max(1, Math.ceil(orders.length / ITEMS_PER_PAGE));

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setPage(prev => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setPage((prev) => Math.min(Math.max(prev + newDirection, 0), totalPages - 1));
  };

  const currentItems = orders.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const variants = {
    enter: (dir) => ({ y: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  // --------------------------------------------------------
  // SelectStatus - ATUALIZADO para salvar no localStorage
  // --------------------------------------------------------
  function SelectStatus({ status, orderId, onChange }) {
    const [open, setOpen] = useState(false);

    const options = [
      { id: "PENDING", label: "Pendente", color: "bg-[#C9A227]" },
      { id: "PREPARING", label: "Em Produção", color: "bg-[#3BB885]" },
      { id: "OUT_FOR_DELIVERY", label: "Saiu para Entrega", color: "bg-[#3498db]" },
      { id: "DELIVERED", label: "Entregue", color: "bg-[#B95760]" },
    ];

    const current = options.find((o) => o.id === status) || options[0];

    const handleStatusChange = (novoStatus) => {
      // Atualizar no localStorage
      const savedOrders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
      const updatedOrders = savedOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder = {
            ...order,
            status: novoStatus,
            timeline: [
              ...order.timeline,
              {
                status: novoStatus,
                timestamp: new Date().toISOString(),
                description: getStatusDescription(novoStatus)
              }
            ]
          };
          return updatedOrder;
        }
        return order;
      });
      
      localStorage.setItem('juju-orders', JSON.stringify(updatedOrders));
      
      // Disparar evento para outros componentes atualizarem
      window.dispatchEvent(new Event('storage'));
      
      // Chamar callback
      onChange(novoStatus);
      setOpen(false);
    };

    const getStatusDescription = (status) => {
      switch (status) {
        case 'PREPARING': return 'Pedido em produção';
        case 'OUT_FOR_DELIVERY': return 'Pedido saiu para entrega';
        case 'DELIVERED': return 'Pedido entregue';
        default: return 'Status atualizado';
      }
    };

    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white ${current.color}`}
        >
          {current.label}
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        {open && (
          <div className="absolute left-0 mt-2 z-50 bg-white border rounded-xl shadow-xl w-48">
            {options.map((op) => (
              <button
                key={op.id}
                onClick={() => handleStatusChange(op.id)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <div className={`w-2 h-2 rounded-full ${op.color}`}></div>
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

      {/* ENTREGAS PENDENTES */}
      <h2 className="text-lg font-bold px-4 pb-2 pt-6 text-[#4F2712]">
        Próximas Entregas
      </h2>

      <div className="px-4">
        <div className="relative">
          {/* arrows */}
          {pendingDeliveries.length > 0 && (
            <>
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
            </>
          )}

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
              {pendingDeliveries.length > 0 ? (
                pendingDeliveries.map((item, idx) => (
                  <div
                    key={item.id}
                    className="min-w-[280px] max-w-[280px] mx-3 flex-shrink-0 cursor-pointer"
                    onClick={() => router.push(`/historico-pedidos/${item.id}`)}
                  >
                    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow-sm border border-[#B95760] hover:shadow-lg transition-shadow">
                      <div
                        className="w-full aspect-video rounded-lg overflow-hidden bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div>
                        <p className="text-brand-brown text-base font-bold">Pedido {item.id}</p>
                        <p className="text-brand-brown/70 text-sm">{item.title}</p>
                        <p className="text-brand-rose text-sm font-bold mt-1">Entrega: {item.date}</p>
                        <p className="text-xs text-gray-500 mt-1">Status: {item.status}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="min-w-[280px] max-w-[280px] mx-3 flex-shrink-0">
                  <div className="flex flex-col gap-3 rounded-lg bg-white p-6 text-center">
                    <CakeIcon className="h-12 w-12 mx-auto text-gray-300" />
                    <p className="text-gray-500">Nenhuma entrega pendente</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* dots */}
          {pendingDeliveries.length > 0 && (
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
          )}
        </div>
      </div>

      {/* TODOS OS PEDIDOS */}
      <h2 className="text-[#4F2712] text-lg font-bold px-4 pb-2 pt-4">
        Todos os Pedidos ({orders.length})
      </h2>

      <div className="relative h-[520px] overflow-hidden px-4">
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
              if (info.offset.y < -120) paginate(1);
              else if (info.offset.y > 120) paginate(-1);
            }}
            className="absolute top-0 left-0 w-full"
          >
            <div className="flex flex-col gap-3 pb-16 p-4">
              {currentItems.length > 0 ? (
                currentItems.map((order) => (
                  <div 
                    key={order.id} 
                    className="flex flex-col gap-3 bg-white p-3 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(`/historico-pedidos/${order.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className="size-16 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${order.image})` }}
                        />
                        <div className="flex flex-col min-w-0">
                          <p className="text-[#B95760] text-base font-bold truncate">
                            #{order.id} - {order.client}
                          </p>
                          <p className="text-brand-brown/70 text-sm">
                            Entrega: {order.deliveryDate} - R$ {order.price.toFixed(2)}
                          </p>
                          <p className="text-brand-brown/70 text-sm truncate">
                            {order.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-brand-brown/50 flex-shrink-0" />
                    </div>

                    {/* STATUS */}
                    <div 
                      className="flex items-center justify-start pt-2 pl-4 border-t border-brand-brown/10"
                      onClick={(e) => e.stopPropagation()} // Impede o redirecionamento ao clicar no status
                    >
                      <SelectStatus
                        status={order.status}
                        orderId={order.id}
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
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CakeIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Nenhum pedido encontrado</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PAGINADOR FIXO */}
      {orders.length > 0 && (
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
      )}

      {/* FAB */}
      <button 
        className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-rose text-white shadow-lg hover:scale-105 transition-transform"
        onClick={() => window.location.reload()} // Recarregar para ver pedidos mais recentes
      >
        ↻
      </button>

      <MenuInferior />
    </div>
  );
}