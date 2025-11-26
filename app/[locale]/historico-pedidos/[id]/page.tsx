"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  CakeIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  TrashIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/CartContext";

interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
    notes?: string;
  };
  items: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    customization?: {
      flavor: string;
      frosting: string;
      toppings: string[];
      addOns: string[];
      extras: string[];
    };
  }>;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
  estimatedDelivery: string;
  status: string;
  timeline: Array<{
    status: string;
    timestamp: string;
    description: string;
  }>;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { updateOrderStatus, getOrderById } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusOpen, setStatusOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [timelineItemToDelete, setTimelineItemToDelete] = useState<number | null>(null);

  useEffect(() => {
    const loadOrder = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
        const foundOrder = orders.find((o: Order) => o.id === params.id);
        setOrder(foundOrder || null);
      } catch (error) {
        console.error('Erro ao carregar pedido:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
    window.addEventListener('storage', loadOrder);
    return () => window.removeEventListener('storage', loadOrder);
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;
    
    const success = updateOrderStatus(order.id, newStatus as any);
    if (success) {
      // Atualiza o estado local para refletir a mudança imediatamente
      const updatedOrder = {
        ...order,
        status: newStatus,
        timeline: [
          ...order.timeline,
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            description: getStatusDescription(newStatus)
          }
        ]
      };
      setOrder(updatedOrder);
      setStatusOpen(false);
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Pedido recebido';
      case 'PREPARING': return 'Pedido em produção';
      case 'OUT_FOR_DELIVERY': return 'Pedido saiu para entrega';
      case 'DELIVERED': return 'Pedido entregue';
      default: return 'Status atualizado';
    }
  };

  const handleDeleteTimelineItem = (index: number) => {
    if (!order) return;

    setTimelineItemToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTimelineItem = () => {
    if (!order || timelineItemToDelete === null) return;

    const newTimeline = [...order.timeline];
    newTimeline.splice(timelineItemToDelete, 1);

    // Determinar o novo status baseado na última entrada do timeline
    const lastTimelineItem = newTimeline[newTimeline.length - 1];
    const newStatus = lastTimelineItem ? lastTimelineItem.status : 'PENDING';

    // Atualizar no localStorage
    const orders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
    const updatedOrders = orders.map((o: Order) => {
      if (o.id === order.id) {
        return {
          ...o,
          status: newStatus,
          timeline: newTimeline
        };
      }
      return o;
    });

    localStorage.setItem('juju-orders', JSON.stringify(updatedOrders));
    
    // Atualizar estado local
    setOrder({
      ...order,
      status: newStatus,
      timeline: newTimeline
    });

    setShowDeleteConfirm(false);
    setTimelineItemToDelete(null);
    
    // Disparar evento para outros componentes
    window.dispatchEvent(new Event('storage'));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-orange-500';
      case 'PREPARING': return 'bg-yellow-500';
      case 'OUT_FOR_DELIVERY': return 'bg-blue-500';
      case 'DELIVERED': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Pendente';
      case 'PREPARING': return 'Em Produção';
      case 'OUT_FOR_DELIVERY': return 'Saiu para Entrega';
      case 'DELIVERED': return 'Entregue';
      default: return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'pix': return 'PIX';
      case 'credit-card': return 'Cartão de Crédito';
      case 'cash': return 'Dinheiro';
      default: return method;
    }
  };

  // Opções de status para o dropdown
  const statusOptions = [
    { id: "PENDING", label: "Pendente", color: "bg-orange-500" },
    { id: "PREPARING", label: "Em Produção", color: "bg-yellow-500" },
    { id: "OUT_FOR_DELIVERY", label: "Saiu para Entrega", color: "bg-blue-500" },
    { id: "DELIVERED", label: "Entregue", color: "bg-green-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFF4] flex items-center justify-center">
        <div className="text-center">
          <CakeIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Carregando detalhes do pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FFFFF4] flex items-center justify-center">
        <div className="text-center">
          <CakeIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Pedido não encontrado</p>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-[#B95760] text-white px-6 py-2 rounded-lg"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFF4] pb-20">
      {/* Header */}
      <header className="bg-[#EEEDDF] p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center"
          >
            <ArrowLeftIcon className="h-6 w-6 text-[#4F2712]" />
          </button>
          <h1 className="text-lg font-bold text-[#4F2712]">
            Pedido {order.id}
          </h1>
        </div>
        
        {/* Status Badge e Seletor */}
        <div className="flex items-center justify-between mt-4">
          <div className="relative">
            <button
              onClick={() => setStatusOpen(!statusOpen)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(order.status)}`}
            >
              {getStatusText(order.status)}
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {statusOpen && (
              <div className="absolute left-0 mt-2 z-50 bg-white border rounded-xl shadow-xl w-48">
                {statusOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleStatusChange(option.id)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <div className={`w-2 h-2 rounded-full ${option.color}`}></div>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600">
            {formatDate(order.orderDate)}
          </p>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Informações do Cliente */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">Informações do Cliente</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#34A7B2] rounded-full flex items-center justify-center">
                <CakeIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{order.customer.name}</p>
                <p className="text-sm text-gray-600">Cliente</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#B95760] rounded-full flex items-center justify-center">
                <PhoneIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{order.customer.phone}</p>
                <p className="text-sm text-gray-600">Telefone</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#4F2712] rounded-full flex items-center justify-center">
                <MapPinIcon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Endereço de Entrega</p>
                <p className="text-sm text-gray-600">{order.customer.address}</p>
              </div>
            </div>

            {order.customer.notes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                <p className="text-sm font-medium text-yellow-800">Observações:</p>
                <p className="text-sm text-yellow-700 mt-1">{order.customer.notes}</p>
              </div>
            )}
          </div>
        </section>

        {/* Itens do Pedido */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">Itens do Pedido</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-rose-600 font-bold text-sm whitespace-nowrap ml-2">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    <span className="font-medium">Quantidade: {item.quantity}</span>
                    <span className="mx-2">•</span>
                    <span>R$ {item.price.toFixed(2)} cada</span>
                  </div>

                  {/* Personalizações */}
                  {item.customization && (
                    <div className="text-xs text-gray-600 space-y-1 mt-2">
                      <div className="flex items-start gap-1">
                        <span className="font-medium">Sabor:</span>
                        <span>{item.customization.flavor}</span>
                      </div>
                      
                      {item.customization.frosting && item.customization.frosting !== 'Nenhuma' && (
                        <div className="flex items-start gap-1">
                          <span className="font-medium">Cobertura:</span>
                          <span>{item.customization.frosting}</span>
                        </div>
                      )}
                      
                      {item.customization.toppings && item.customization.toppings.length > 0 && (
                        <div className="flex items-start gap-1">
                          <span className="font-medium">Toppings:</span>
                          <span>{item.customization.toppings.join(', ')}</span>
                        </div>
                      )}
                      
                      {item.customization.addOns && item.customization.addOns.length > 0 && (
                        <div className="flex items-start gap-1">
                          <span className="font-medium">Add-ons:</span>
                          <span>{item.customization.addOns.join(', ')}</span>
                        </div>
                      )}
                      
                      {item.customization.extras && item.customization.extras.length > 0 && (
                        <div className="flex items-start gap-1">
                          <span className="font-medium">Extras:</span>
                          <span>{Array.isArray(item.customization.extras) 
                            ? item.customization.extras.join(', ')
                            : JSON.stringify(item.customization.extras)
                          }</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Informações de Pagamento e Entrega */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">Informações de Entrega</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CalendarIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Entrega Estimada</p>
                <p className="text-sm text-gray-600">{formatDate(order.estimatedDelivery)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <CreditCardIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Pagamento</p>
                <p className="text-sm text-gray-600">{getPaymentMethodText(order.paymentMethod)}</p>
                {order.paymentMethod === 'pix' && order.discount > 0 && (
                  <p className="text-xs text-green-600 mt-1">
                    Desconto de R$ {order.discount.toFixed(2)} aplicado
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline do Pedido */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-[#4F2712]">Andamento do Pedido</h2>
            {order.timeline.length > 1 && (
              <p className="text-sm text-gray-500">
                {order.timeline.length} atualizações
              </p>
            )}
          </div>
          <div className="space-y-4">
            {order.timeline.map((event, index) => (
              <div key={index} className="flex gap-3 group relative">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    index === order.timeline.length - 1 ? getStatusColor(event.status) : 'bg-gray-300'
                  }`}></div>
                  {index < order.timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                  )}
                </div>
                <div className="flex-1 pb-4 last:pb-0">
                  <p className="font-medium text-gray-800 text-sm w-[90%]">{event.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(event.timestamp)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full text-white mt-1 inline-block ${
                    getStatusColor(event.status)
                  }`}>
                    {getStatusText(event.status)}
                  </span>
                </div>
                
                {/* Botão para remover entrada do timeline (exceto a primeira) */}
                {index > 0 && (
                  <button
                    onClick={() => handleDeleteTimelineItem(index)}
                    className="absolute right-0 top-0 transition-opacity p-1 text-gray-400 hover:text-red-500 w-[10%]"
                    title="Remover esta atualização"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Resumo Financeiro */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-[#4F2712] mb-3">Resumo do Pedido</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>R$ {order.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-gray-700">
              <span>Taxa de Entrega</span>
              <span>R$ {order.deliveryFee.toFixed(2)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Desconto</span>
                <span>- R$ {order.discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-2 mt-2" />
            
            <div className="flex justify-between font-bold text-base text-gray-800">
              <span>Total</span>
              <span>R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Modal de Confirmação para Excluir Timeline Item */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#4F2712]">Confirmar Exclusão</h3>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja remover esta atualização do histórico? 
              O status do pedido será revertido para a atualização anterior.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteTimelineItem}
                className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}