// app/order-confirmation/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckIcon, TruckIcon, ClockIcon, HomeIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Header } from '@/components/Client/Header';

interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
    notes?: string;
    paymentMethod: string;
  };
  items: any[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
  estimatedDelivery: string;
  status: string;
  timeline: any[];
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [countdown, setCountdown] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
      const foundOrder = orders.find((o: Order) => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId]);

  useEffect(() => {
    if (!order) return;

    // Calcular countdown para entrega (dias, horas, minutos)
    const updateCountdown = () => {
      const now = new Date();
      const delivery = new Date(order.estimatedDelivery);
      const diff = delivery.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        let countdownText = '';
        if (days > 0) countdownText += `${days}d `;
        if (hours > 0) countdownText += `${hours}h `;
        if (minutes > 0) countdownText += `${minutes}m`;
        
        setCountdown(countdownText.trim() || 'Menos de 1 minuto');
      } else {
        setCountdown('Entregue');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    
    return () => clearInterval(interval);
  }, [order]);

  const toggleItemDetails = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleTrackOrder = () => {
    router.push('/track-order');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-rose-50">
        <Header />
        <div className="container mx-auto max-w-md p-4 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando confirmação do pedido...</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-rose-50">
      <Header />

      <main className="container mx-auto max-w-md p-4 pb-32">
        <div className="bg-white rounded-2xl p-3 shadow-sm mt-6">
          {/* Ícone de Confirmação */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-[#4F2712] mb-2">Pedido Confirmado!</h1>
            <p className="text-gray-600">
              Obrigado pela sua compra, {order.customer.name}! Seu pedido está sendo preparado com todo carinho.
            </p>
          </div>

          {/* Número do Pedido */}
          <div className="bg-rose-50 rounded-lg p-4 text-center mb-6">
            <p className="text-sm text-gray-600">Número do Pedido</p>
            <p className="text-xl font-bold text-rose-600">{order.id}</p>
            <p className="text-sm text-gray-600 mt-1">
              Data do pedido: {formatDate(order.orderDate)}
            </p>
          </div>

          {/* Resumo Rápido */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <TruckIcon className="h-8 w-8 text-rose-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Previsão de Entrega</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(order.estimatedDelivery)}
              </p>
              <p className="font-semibold text-gray-800">{countdown}</p>
            </div>
            <div className="text-center">
              <ClockIcon className="h-8 w-8 text-rose-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold text-green-600">Confirmado</p>
            </div>
          </div>

          {/* Informações de Entrega */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Informações de Entrega</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <HomeIcon className="h-5 w-5 text-rose-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{order.customer.name}</p>
                  <p className="text-gray-600 text-sm">{order.customer.address}</p>
                  <p className="text-gray-600 text-sm">{order.customer.phone}</p>
                  {order.customer.notes && (
                    <div className="mt-2 p-2 bg-rose-50 rounded">
                      <p className="text-xs text-rose-700">
                        <strong>Observações:</strong> {order.customer.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Resumo do Pedido */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Resumo do Pedido</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => {
                const isExpanded = expandedItems.includes(index);
                const hasCustomization = item.customization && (
                  item.customization.frosting !== 'Nenhuma' ||
                  (item.customization.toppings && item.customization.toppings.length > 0) ||
                  (item.customization.addOns && item.customization.addOns.length > 0) ||
                  (item.customization.extras && item.customization.extras.length > 0)
                );

                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex gap-4">
                      {/* Imagem do item */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-rose-600 font-bold text-sm mt-1">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">
                              {item.quantity}x • Sabor: {item.customization?.flavor || 'Não especificado'}
                            </p>
                          </div>
                        </div>

                        {/* Botão para expandir detalhes */}
                        {hasCustomization && (
                          <button
                            onClick={() => toggleItemDetails(index)}
                            className="flex items-center gap-1 text-rose-500 text-xs mt-2 hover:text-rose-600 transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUpIcon className="h-3 w-3" />
                                Menos detalhes
                              </>
                            ) : (
                              <>
                                <ChevronDownIcon className="h-3 w-3" />
                                Mais detalhes
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Detalhes expandidos */}
                    {isExpanded && item.customization && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-600 space-y-2">
                          {item.customization.frosting && item.customization.frosting !== 'Nenhuma' && (
                            <div>
                              <strong>Cobertura:</strong> {item.customization.frosting}
                            </div>
                          )}
                          
                          {item.customization.toppings && item.customization.toppings.length > 0 && (
                            <div>
                              <strong>Toppings:</strong> {item.customization.toppings.join(', ')}
                            </div>
                          )}
                          
                          {item.customization.addOns && item.customization.addOns.length > 0 && (
                            <div>
                              <strong>Add-Ons:</strong> {item.customization.addOns.join(', ')}
                            </div>
                          )}
                          
                          {item.customization.extras && item.customization.extras.length > 0 && (
                            <div>
                              <strong>Extras:</strong> {item.customization.extras.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Resumo financeiro */}
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>R$ {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxa de Entrega</span>
                <span>R$ {order.deliveryFee.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto {order.paymentMethod === 'pix' ? 'PIX' : ''}</span>
                  <span>- R$ {order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>R$ {order.total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Forma de Pagamento */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Forma de Pagamento</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-800 capitalize">
                {order.paymentMethod === 'pix' ? 'PIX' : 
                 order.paymentMethod === 'credit-card' ? 'Cartão de Crédito' : 'Dinheiro'}
              </p>
              {order.paymentMethod === 'pix' && (
                <p className="text-green-600 text-sm mt-1">
                  Desconto de 5% aplicado - Economia de R$ {order.discount.toFixed(2)}
                </p>
              )}
            </div>
          </section>

          {/* Próximos Passos */}
          <section className="bg-rose-50 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-gray-800 mb-2">Próximos Passos</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Você receberá uma confirmação por WhatsApp no número {order.customer.phone}</li>
              <li>• Acompanhe o status do seu pedido usando o mesmo número de telefone</li>
              <li>• Tempo médio de preparo: 2-3 dias úteis</li>
              <li>• Entregamos de segunda a sábado, das 8h às 18h</li>
            </ul>
          </section>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 p-4 border-t border-rose-100 shadow-lg">
        <div className="max-w-md mx-auto space-y-3">
          <button
            onClick={handleTrackOrder}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Acompanhar Pedido
          </button>
          <button
            onClick={handleBackToHome}
            className="w-full border border-rose-500 text-rose-500 hover:bg-rose-50 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Voltar à Loja
          </button>
        </div>
      </footer>
    </div>
  );
}