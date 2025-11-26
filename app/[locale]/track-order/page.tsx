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
  PhoneIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Header } from '@/components/Client/Header';
import { Footer } from '@/components/Client/Footer';

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

// Dados de exemplo para demonstração (remova em produção)
const SAMPLE_ORDERS = [
  {
    id: 'JUJU' + Date.now().toString().slice(-8),
    customer: {
      name: 'João Silva',
      address: 'Rua das Flores, 123 - Centro',
      phone: '11999999999',
      notes: 'Entregar após as 14h'
    },
    items: [
      {
        id: 1,
        name: 'Bolo de Chocolate Personalizado',
        description: 'Bolo decorado com chocolate',
        price: 80.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJeZalV3RmogkHWMdqXX_lLoBKmiLozGHk2ondHXW3XTYMpDBkNLgCwzWtowoRcw5E2_DAwToez2QUZuwiqbsDsUiaNN5wHJUPr58L1g2jQJfFUXSlo5BGqm4e2Ee-ERUr9BYOrCv1uCfkzbfry_bav5vzKi_ktJVrl8zqJW9kQ2UV7pcVk3q28NU651xYugpLzVISVeu8e2nKiQsIeUSCLIAecCBTrgPvSYueN_WsjkCP6skDA3T04bZpyw7TB-m6UHxo4CXwZCQ3',
        customization: {
          flavor: 'Chocolate',
          frosting: 'Ganache de Chocolate',
          toppings: ['Frutas Frescas', 'Chocolate Premium'],
          addOns: ['Velas Personalizadas'],
          extras: ['Brigadeiros']
        }
      }
    ],
    subtotal: 80.00,
    deliveryFee: 8.00,
    discount: 4.40,
    total: 83.60,
    paymentMethod: 'pix',
    orderDate: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'PENDING',
    timeline: [
      {
        status: 'PENDING',
        timestamp: new Date().toISOString(),
        description: 'Pedido recebido e confirmado'
      },
      {
        status: 'PREPARING',
        timestamp: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        description: 'Iniciando preparação dos ingredientes'
      }
    ]
  }
];

export default function TrackOrderPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const formatPhoneForSearch = (phone: string) => {
    // Remove tudo que não é número para comparação consistente
    return phone.replace(/\D/g, '');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchPhone = formatPhoneForSearch(phone);
    if (!searchPhone) {
      alert('Por favor, digite um número de telefone válido');
      return;
    }

    setIsLoading(true);
    setSearched(true);

    try {
      // Buscar pedidos no localStorage
      const allOrders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
      
      // Filtrar pedidos pelo telefone (formato consistente)
      const foundOrders = allOrders.filter((order: any) => {
        const orderPhone = formatPhoneForSearch(order.customer.phone);
        const searchPhoneFormatted = formatPhoneForSearch(searchPhone);
        
        console.log('Comparando:', orderPhone, 'com', searchPhoneFormatted);
        return orderPhone === searchPhoneFormatted;
      });

      // Se não encontrou pedidos, mostrar mensagem
      if (foundOrders.length === 0) {
        console.log('Nenhum pedido encontrado para:', searchPhone);
        console.log('Pedidos no localStorage:', allOrders);
      }

      // Ordenar por data mais recente primeiro
      foundOrders.sort((a: any, b: any) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      
      setOrders(foundOrders);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItemDetails = (orderId: string, itemId: number) => {
    const key = `${orderId}-${itemId}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusInfo = (status: string) => {
    return ORDER_STATUS[status as keyof typeof ORDER_STATUS] || ORDER_STATUS.PENDING;
  };

  const getProgressPercentage = (currentStatus: string) => {
    const statusOrder = ['PENDING', 'PREPARING', 'BAKING', 'DECORATING', 'READY', 'ON_THE_WAY', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0;
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

  const formatPhoneDisplay = (phone: string) => {
    // Formatar telefone para exibição: (11) 99999-9999
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-[#FFFFF4]">
      <Header />

      <main className="container mx-auto max-w-2xl pb-32">
        <div className="bg-white rounded-2xl p-3 shadow-sm mt-6 gap-y-5 flex flex-col">
          <h1 className="text-3xl font-bold text-[#4F2712] mb-2 px-4 pt-4 text-center">Rastrear Seu Pedido</h1>
          <p className="text-gray-600 mb-6 px-4 text-center">
            Digite o número de telefone usado no pedido para acompanhar o status
          </p>

          {/* Formulário de Busca */}
          <form onSubmit={handleSearch}>
            <div className="flex flex-col gap-2 items-end px-4">
              <div className="flex-1 relative">
                <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  pattern="[0-9\s\-\(\)]+"
                  title="Digite um número de telefone válido"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg justify-center font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-row w-[50%] items-center gap-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5"/>
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
                    Não encontramos pedidos para o número <strong>{formatPhoneDisplay(phone)}</strong>.
                  </p>
                  <p className="text-sm text-gray-500">
                    Verifique se o número está correto ou entre em contato conosco.
                  </p>
                  <div className="mt-4 p-4 bg-[#FFFFF4] rounded-lg">
                    <p className="text-sm text-rose-600">
                      <strong>Dica:</strong> Use o mesmo número que você usou ao fazer o pedido.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-[#FFFFF4] rounded-lg p-4 mb-4">
                    <p className="text-sm text-rose-600 text-center">
                      Encontramos {orders.length} pedido(s) para
                    </p>
                    <p className="text-sm text-rose-600 text-center">
                      {formatPhoneDisplay(phone)}
                    </p>
                  </div>

                  {orders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const progress = getProgressPercentage(order.status);
                    
                    return (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        {/* Cabeçalho do Pedido */}
                        <div className="flex flex-row justify-between items-start mb-4">
                          <div className='w-[60%]'>
                            <h3 className="font-semibold text-[#4F2712]">Pedido #{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.orderDate)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              <strong>Cliente:</strong> {order.customer.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              <strong>Telefone:</strong> {formatPhoneDisplay(order.customer.phone)}
                            </p>
                          </div>
                          <div className={`flex w-[40%] py-1 rounded-full text-sm font-medium justify-center items-center ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {statusInfo.label}
                          </div>
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
                          <h4 className="font-semibold text-gray-800 mb-3">Itens do Pedido</h4>
                          <ul className="space-y-4">
                            {order.items.map((item: any, index: number) => {
                              const itemKey = `${order.id}-${item.id}`;
                              const isExpanded = expandedItems[itemKey];
                              
                              return (
                                <li key={index} className="flex flex-col gap-3 py-3 bg-[#B95760] bg-opacity-[25%] px-3 rounded-lg">
                                  <div className='flex flex-row items-center gap-x-4'>
                                    {/* Imagem do Bolo */}
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-[25%] rounded-lg object-cover flex-shrink-0"
                                    />

                                      <p className="w-[75%] font-semibold text-base text-gray-800 text-left">{item.name}</p>
                                      
                                  </div>

                                  
                                  <div className="flex-1">
                                    {/* Informações Básicas */}
                                    <p className="font-semibold text-right text-base pt-3 text-rose-600">
                                        {item.quantity}x R$ {item.price.toFixed(2)}
                                      </p>
                                    {/* Customizações Básicas (sempre visíveis) */}
                                    <div className="text-sm text-gray-600 space-y-1  py-2">
                                      <div><strong>Sabor:</strong> {item.customization?.flavor}</div>
                                      {item.customization?.frosting && item.customization.frosting !== 'Nenhuma' && (
                                        <div><strong>Cobertura:</strong> {item.customization.frosting}</div>
                                      )}
                                    </div>

                                    {/* Botão Ver Mais/Menos */}
                                    {(item.customization?.toppings?.length > 0 || 
                                      item.customization?.addOns?.length > 0 || 
                                      item.customization?.extras?.length > 0) && (
                                      <button
                                        onClick={() => toggleItemDetails(order.id, item.id)}
                                        className="py-2 flex items-center gap-1 text-rose-500 text-xs mt-2 hover:text-rose-600 transition-colors w-full justify-center text-center"
                                      >
                                        {isExpanded ? (
                                          <>
                                            <ChevronUpIcon className="h-3 w-3" />
                                            Ver menos detalhes
                                          </>
                                        ) : (
                                          <>
                                            <ChevronDownIcon className="h-3 w-3" />
                                            Ver mais detalhes
                                          </>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                  {/* Detalhes Expandidos */}
                                  {isExpanded && (
                                    <div className="mt-3 pt-3 border-t border-gray-200 ">
                                      <div className="text-sm text-gray-600 space-y-2">
                                        {/* Toppings */}
                                        {item.customization?.toppings?.length > 0 && (
                                          <div>
                                            <strong className="text-gray-700">Toppings:</strong>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {item.customization.toppings.map((topping: string, idx: number) => (
                                                <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                                  {topping}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Add-Ons */}
                                        {item.customization?.addOns?.length > 0 && (
                                          <div>
                                            <strong className="text-gray-700">Add-Ons:</strong>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {item.customization.addOns.map((addon: string, idx: number) => (
                                                <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                                  {addon}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Extras */}
                                        {item.customization?.extras?.length > 0 && (
                                          <div>
                                            <strong className="text-gray-700">Extras:</strong>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {item.customization.extras.map((extra: string, idx: number) => (
                                                <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                                  {extra}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
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
              <p className="text-sm text-gray-500 mt-2">Verificando o número {formatPhoneDisplay(phone)}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}