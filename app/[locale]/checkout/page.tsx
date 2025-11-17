// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    // Criar objeto do pedido
    const order = {
      id: 'JUJU' + Date.now().toString().slice(-6),
      customer: formData,
      items: cartItems,
      subtotal,
      deliveryFee,
      discount: pixDiscount,
      total: finalTotal,
      paymentMethod: formData.paymentMethod,
      orderDate: new Date().toISOString(),
      estimatedDelivery: calculateEstimatedDelivery(),
      status: 'PENDING',
      timeline: [
        {
          status: 'PENDING',
          timestamp: new Date().toISOString(),
          description: 'Pedido recebido'
        }
      ]
    };

    // Salvar pedido no localStorage
    const existingOrders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('juju-orders', JSON.stringify(existingOrders));

    // Limpar carrinho
    clearCart();

    // Redirecionar para confirmação, passando o ID do pedido
    router.push(`/order-confirmation?orderId=${order.id}`);
  };

  return (
    <div className="min-h-screen bg-rose-50">
      <Header />

      <main className="container mx-auto max-w-md p-4 space-y-6 pb-32">
        <h2 className="text-2xl font-bold text-center text-gray-800">Finalize seu Pedido</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações de Entrega */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-700">Informações de Entrega</h3>
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
                  placeholder="(XX) XXXXX-XXXX"
                />
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
            <h3 className="text-lg font-bold mb-3 text-gray-700">Resumo do Pedido</h3>
            <div className="bg-white p-4 rounded-lg shadow space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-700">
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.quantity}x R$ {item.price.toFixed(2)}
                      {item.customization && (
                        <div className="mt-1 text-xs">
                          <div><strong>Sabor:</strong> {item.customization.flavor}</div>
                          {item.customization.frosting && item.customization.frosting !== 'Nenhuma' && (
                            <div><strong>Cobertura:</strong> {item.customization.frosting}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="font-semibold whitespace-nowrap ml-2">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-700">
                <span>Taxa de Entrega</span>
                <span>R$ {deliveryFee.toFixed(2)}</span>
              </div>

              {formData.paymentMethod === 'pix' && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto PIX (5%)</span>
                  <span>- R$ {pixDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-2 mt-2" />
              
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>R$ {finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Forma de Pagamento */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-700">Forma de Pagamento</h3>
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
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Confirmar Pedido - R$ {finalTotal.toFixed(2)}
          </button>
        </div>
      </footer>
    </div>
  );
}