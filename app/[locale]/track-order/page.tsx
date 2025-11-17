// app/track-order/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  CakeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Header } from '@/components/Client/Header';

// Status possíveis para os pedidos
const ORDER_STATUS = {
  PENDING: { label: 'Pedido Recebido', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  PREPARING: { label: 'Em Preparação', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  BAKING: { label: 'Assando', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  DECORATING: { label: 'Decorando', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  READY: { label: 'Pronto para Entrega', color: 'text-green-600', bgColor: 'bg-green-100' },
  ON_THE_WAY: { label: 'Saiu para Entrega', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  DELIVERED: { label: 'Entregue', color: 'text-green-600', bgColor: 'bg-green-100' },
  CANCELLED: { label: 'Cancelado', color: 'text-red-600', bgColor: 'bg-red-100' }
};

export default function TrackOrderPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setIsLoading(true);
    setSearched(true);

    // Buscar pedidos no localStorage pelo número de telefone
    setTimeout(() => {
      try {
        const allOrders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
        const foundOrders = allOrders.filter((order: any) => {
          const orderPhone = order.customer.phone.replace(/\D/g, '');
          const searchPhone = phone.replace(/\D/g, '');
          return orderPhone.includes(searchPhone) || searchPhone.includes(orderPhone);
        });
        
        // Ordenar por data mais recente primeiro
        foundOrders.sort((a: any, b: any) => 
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        
        setOrders(foundOrders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        setOrders([]);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusInfo = (status: string) => {
    return ORDER_STATUS[status as keyof typeof ORDER_STATUS] || ORDER_STATUS.PENDING;
  };

  const getProgressPercentage = (currentStatus: string) => {
    const statusOrder = Object.keys(ORDER_STATUS);
    const currentIndex = statusOrder.indexOf(currentStatus);
    return ((currentIndex + 1) / statusOrder.length) * 100;
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

  const getCountdown = (estimatedDelivery: string) => {
    const now = new Date();
    const delivery = new Date(estimatedDelivery);
    const diff = delivery.getTime() - now.getTime();
    
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      let countdownText = '';
      if (days > 0) countdownText += `${days}d `;
      if (hours > 0) countdownText += `${hours}h `;
      if (minutes > 0) countdownText += `${minutes}m`;
      
      return countdownText.trim() || 'Menos de 1 minuto';
    }
    return 'Entregue';
  };

  return (
    <div className="min-h-screen bg-rose-50">
      <Header />

      <main className="container mx-auto max-w-2xl p-4 pb-32">
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Rastrear Seu Pedido</h1>
          <p className="text-gray-600 mb-6">
            Digite o número de telefone usado no pedido para acompanhar o status
          </p>

          {/* Formulário de Busca */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                {isLoading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </form>

          {/* Resultados */}
          {searched && !isLoading && (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <TruckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum pedido encontrado</h3>
                  <p className="text-gray-600 mb-4">
                    Não encontramos pedidos para o número <strong>{phone}</strong>.
                  </p>
                  <p className="text-sm text-gray-500">
                    Verifique se o número está correto ou entre em contato conosco.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-rose-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-rose-700">
                      📞 <strong>Telefone:</strong> {phone}
                    </p>
                    <p className="text-sm text-rose-600 mt-1">
                      Encontramos {orders.length} pedido(s) para este número
                    </p>
                  </div>

                  {orders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const progress = getProgressPercentage(order.status);
                    
                    return (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        {/* Cabeçalho do Pedido */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-gray-800">Pedido #{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.orderDate)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              <strong>Cliente:</strong> {order.customer.name}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>

                        {/* Barra de Progresso */}
                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progresso do Pedido</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Itens do Pedido */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Itens do Pedido</h4>
                          <ul className="text-sm text-gray-600">
                            {order.items.map((item: any, index: number) => (
                              <li key={index} className="flex items-center gap-2 mb-2">
                                <CakeIcon className="h-4 w-4 text-rose-500 flex-shrink-0" />
                                <div className="flex-1">
                                  <span className="font-medium">{item.name}</span>
                                  <div className="text-xs text-gray-500 mt-1">
                                    <div><strong>Sabor:</strong> {item.customization?.flavor}</div>
                                    {item.customization?.frosting && item.customization.frosting !== 'Nenhuma' && (
                                      <div><strong>Cobertura:</strong> {item.customization.frosting}</div>
                                    )}
                                  </div>
                                </div>
                                <span className="font-semibold">
                                  {item.quantity}x R$ {item.price.toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Timeline */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Histórico do Pedido</h4>
                          <div className="space-y-3">
                            {order.timeline.map((event: any, index: number) => {
                              const eventStatus = getStatusInfo(event.status);
                              const isCompleted = index <= order.timeline.findIndex((e: any) => e.status === order.status);
                              
                              return (
                                <div key={index} className="flex gap-3">
                                  <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                                    }`}>
                                      {isCompleted ? (
                                        <CheckIcon className="h-4 w-4 text-white" />
                                      ) : (
                                        <ClockIcon className="h-4 w-4 text-white" />
                                      )}
                                    </div>
                                    {index < order.timeline.length - 1 && (
                                      <div className={`flex-1 w-0.5 ${
                                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                                      }`} />
                                    )}
                                  </div>
                                  <div className="flex-1 pb-4">
                                    <p className={`font-medium ${
                                      isCompleted ? 'text-gray-800' : 'text-gray-500'
                                    }`}>
                                      {eventStatus.label}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {formatDate(event.timestamp)}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {event.description}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Informações de Entrega */}
                        {order.status === 'ON_THE_WAY' && order.estimatedDelivery && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2 text-blue-800 mb-2">
                              <TruckIcon className="h-5 w-5" />
                              <span className="font-semibold">Previsão de Entrega</span>
                            </div>
                            <p className="text-blue-700 text-sm">
                              <strong>Tempo restante:</strong> {getCountdown(order.estimatedDelivery)}
                            </p>
                            <p className="text-blue-700 text-sm">
                              <strong>Data prevista:</strong> {formatDate(order.estimatedDelivery)}
                            </p>
                          </div>
                        )}

                        {order.status === 'DELIVERED' && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 text-green-800 mb-2">
                              <CheckCircleIcon className="h-5 w-5" />
                              <span className="font-semibold">Pedido Entregue</span>
                            </div>
                            <p className="text-green-700 text-sm">
                              Entregue em {formatDate(order.timeline[order.timeline.length - 1]?.timestamp || order.orderDate)}
                            </p>
                          </div>
                        )}

                        {/* Resumo Financeiro */}
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-semibold text-gray-800 mb-2">Resumo do Pedido</h5>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>R$ {order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Entrega:</span>
                              <span>R$ {order.deliveryFee.toFixed(2)}</span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Desconto:</span>
                                <span>- R$ {order.discount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-bold border-t border-gray-300 pt-1 mt-1">
                              <span>Total:</span>
                              <span>R$ {order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Buscando seus pedidos...</p>
              <p className="text-sm text-gray-500 mt-2">Verificando o número {phone}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}