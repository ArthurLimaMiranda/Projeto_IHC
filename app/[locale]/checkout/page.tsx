// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ShoppingCartIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Header } from '@/components/Client/Header';
import { useCart } from '@/contexts/CartContext';

// Função para calcular a data de entrega estimada (3 dias a partir de agora)
const calculateEstimatedDelivery = () => {
  const now = new Date();
  const estimatedDelivery = new Date(now);
  estimatedDelivery.setDate(now.getDate() + 3); // 3 dias a partir de hoje
  estimatedDelivery.setHours(18, 0, 0, 0); // Entrega às 18:00
  return estimatedDelivery.toISOString();
};

const createDefaultTimeline = () => [
  {
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    description: 'Pedido recebido e confirmado'
  },
  {
    status: 'PREPARING',
    timestamp: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos depois
    description: 'Iniciando preparação dos ingredientes'
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'pix' as 'pix' | 'credit-card' | 'cash',
    notes: '',
  });
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 8.00;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;

  // Calcular desconto do PIX (5%)
  const pixDiscount = formData.paymentMethod === 'pix' ? total * 0.05 : 0;
  const finalTotal = formData.paymentMethod === 'pix' ? total - pixDiscount : total;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: 'pix' | 'credit-card' | 'cash') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const toggleItemDetails = (itemId: number) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const hasCustomizations = (item: any) => {
    const customization = item.customization || {};
    return (
      (customization.toppings && customization.toppings.length > 0) ||
      (customization.addOns && customization.addOns.length > 0) ||
      (customization.extras && customization.extras.length > 0)
    );
  };

  // Função para garantir que extras sejam tratados como array de strings
  const getExtrasDisplay = (extras: any): string[] => {
    if (!extras) return [];
    
    // Se já for array de strings, retorna como está
    if (Array.isArray(extras) && extras.length > 0 && typeof extras[0] === 'string') {
      return extras;
    }
    
    // Se for array de objetos, extrai os nomes
    if (Array.isArray(extras) && extras.length > 0 && typeof extras[0] === 'object') {
      return extras.map((extra: any) => extra.name || extra);
    }
    
    return [];
  };

  const formatPhoneForStorage = (phone: string) => {
    // Remove tudo que não é número
    return phone.replace(/\D/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    // Validar campos obrigatórios
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      setIsSubmitting(false);
      return;
    }

    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      setIsSubmitting(false);
      return;
    }

    try {
      // Formatar telefone para armazenamento consistente
      const formattedPhone = formatPhoneForStorage(formData.phone);

      // Processar itens para garantir que os dados estejam consistentes
      const processedItems = cartItems.map(item => ({
        ...item,
        id: item.id || Date.now() + Math.random(), // Garantir ID único
        customization: {
          ...item.customization,
          // Garantir que extras sejam sempre array de strings
          extras: getExtrasDisplay(item.customization?.extras)
        }
      }));

      // Criar objeto do pedido
      const order = {
        id: 'JUJU' + Date.now().toString().slice(-8),
        customer: {
          ...formData,
          phone: formattedPhone,
        },
        items: processedItems,
        subtotal,
        deliveryFee,
        discount: pixDiscount,
        total: finalTotal,
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString(),
        estimatedDelivery: calculateEstimatedDelivery(),
        status: 'PENDING',
        timeline: createDefaultTimeline()
      };

      // Salvar pedido no localStorage
      const existingOrders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
      
      // Verificar se já existe um pedido com o mesmo ID
      const orderExists = existingOrders.some((existingOrder: any) => existingOrder.id === order.id);
      if (!orderExists) {
        existingOrders.push(order);
        localStorage.setItem('juju-orders', JSON.stringify(existingOrders));
        console.log('Pedido salvo:', order);
      }

      // Limpar carrinho
      clearCart();

      // Redirecionar para confirmação, passando o ID do pedido
      router.push(`/order-confirmation?orderId=${order.id}`);
      
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Erro ao processar seu pedido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFF4]">
      <Header />

      <main className="container mx-auto max-w-md p-4 space-y-6 pb-32">
        <h2 className="text-3xl font-bold text-center text-[#4F2712]">Finalize seu Pedido</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações de Entrega */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-[#4F2712]">Informações de Entrega</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="name">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="address">
                  Endereço de Entrega *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Rua, Número, Bairro, Cidade - Estado"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="phone">
                  Telefone para Contato *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                  pattern="[0-9\s\-\(\)]+"
                  title="Digite um número de telefone válido"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Este número será usado para rastrear seu pedido
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="notes">
                  Observações (Opcional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Alguma observação sobre a entrega? Ponto de referência, horário preferencial, etc."
                />
              </div>
            </div>
          </section>

          {/* Resumo do Pedido */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-[#4F2712]">Resumo do Pedido</h3>
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              {cartItems.map((item) => {
                const isExpanded = expandedItems.includes(item.id);
                const hasMoreDetails = hasCustomizations(item);
                const customization = item.customization || {};
                
                return (
                  <div key={item.id} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex gap-3">
                      {/* Imagem do bolo */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                        />
                      </div>
                      
                      {/* Informações do item */}
                      <div className="flex-1 min-w-0">
                        {/* Nome completo e preço */}
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-rose-600 font-bold text-sm whitespace-nowrap ml-2">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        {/* Quantidade */}
                        <div className="text-xs text-gray-500 mb-1">
                          <span className="font-medium">Quantidade: {item.quantity}</span>
                        </div>
                        
                        {/* Informações básicas sempre visíveis */}
                        {customization && (
                          <div className="text-xs text-gray-600 space-y-1">
                            <div className="flex items-start gap-1">
                              <span className="font-medium">Sabor:</span>
                              <span>{customization.flavor}</span>
                            </div>
                            {customization.frosting && customization.frosting !== 'Nenhuma' && (
                              <div className="flex items-start gap-1">
                                <span className="font-medium">Cobertura:</span>
                                <span>{customization.frosting}</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Botão Ver Mais/Menos */}
                        {hasMoreDetails && (
                          <button
                            type="button"
                            onClick={() => toggleItemDetails(item.id)}
                            className="flex items-center gap-1 text-rose-500 text-xs mt-2 hover:text-rose-600 transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUpIcon className="h-3 w-3" />
                                Ver menos
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
                    </div>
                    
                    {/* Detalhes expandidos */}
                    {isExpanded && customization && (
                      <div className="mt-3 pl-19 space-y-2">
                        {/* Toppings */}
                        {customization.toppings && customization.toppings.length > 0 && (
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">Toppings: </span>
                            <span>{customization.toppings.join(', ')}</span>
                          </div>
                        )}
                        
                        {/* Add-ons */}
                        {customization.addOns && customization.addOns.length > 0 && (
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">Add-ons: </span>
                            <span>{customization.addOns.join(', ')}</span>
                          </div>
                        )}
                        
                        {/* Extras - CORRIGIDO AQUI */}
                        {customization.extras && customization.extras.length > 0 && (
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">Extras: </span>
                            <span>{getExtrasDisplay(customization.extras).join(', ')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Resumo financeiro */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">R$ {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span className="text-sm">Taxa de Entrega</span>
                  <span className="text-sm font-medium">R$ {deliveryFee.toFixed(2)}</span>
                </div>

                {formData.paymentMethod === 'pix' && (
                  <div className="flex justify-between text-green-600">
                    <span className="text-sm">Desconto PIX (5%)</span>
                    <span className="text-sm font-medium">- R$ {pixDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-2 mt-2" />
                
                <div className="flex justify-between font-bold text-base text-gray-800">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Forma de Pagamento */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-[#4F2712]">Forma de Pagamento</h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('pix')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.paymentMethod === 'pix'
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-300 bg-white hover:border-rose-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    formData.paymentMethod === 'pix'
                      ? 'border-rose-500 bg-rose-500'
                      : 'border-gray-400'
                  }`} />
                  <div>
                    <span className="font-medium text-gray-800">PIX</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Pagamento instantâneo com 5% de desconto
                    </p>
                    {formData.paymentMethod === 'pix' && (
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Economize R$ {pixDiscount.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePaymentMethodChange('credit-card')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.paymentMethod === 'credit-card'
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-300 bg-white hover:border-rose-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    formData.paymentMethod === 'credit-card'
                      ? 'border-rose-500 bg-rose-500'
                      : 'border-gray-400'
                  }`} />
                  <span className="font-medium text-gray-800">Cartão de Crédito</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 ml-7">
                  Parcele em até 3x sem juros
                </p>
              </button>

              <button
                type="button"
                onClick={() => handlePaymentMethodChange('cash')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.paymentMethod === 'cash'
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-300 bg-white hover:border-rose-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    formData.paymentMethod === 'cash'
                      ? 'border-rose-500 bg-rose-500'
                      : 'border-gray-400'
                  }`} />
                  <span className="font-medium text-gray-800">Dinheiro</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 ml-7">
                  Pagamento na entrega
                </p>
              </button>
            </div>
          </section>
        </form>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 p-4 border-t border-rose-100 shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {isSubmitting ? 'Processando...' : `Confirmar Pedido - R$ ${finalTotal.toFixed(2)}`}
          </button>
        </div>
      </footer>
    </div>
  );
}