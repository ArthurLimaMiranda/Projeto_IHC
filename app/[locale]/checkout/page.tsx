// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

// Dados mockados
const orderItems = [
  {
    id: 1,
    name: 'Bolo de Chocolate Personalizado',
    description: '2kg com recheio de brigadeiro',
    price: 80.00,
    quantity: 1,
  },
];

const deliveryFee = 10.00;
const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryFee;

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'pix' as 'pix' | 'credit-card' | 'cash',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: 'pix' | 'credit-card' | 'cash') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você integraria com a API de pagamento
    console.log('Dados do pedido:', formData);
    // Redirecionar para confirmação
    router.push('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-rose-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 p-4 backdrop-blur-sm border-b border-rose-100">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-rose-600 hover:text-rose-700 transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <h1 className="font-display text-3xl text-rose-600">Juju</h1>
          <p className="text-sm font-bold tracking-wider text-gray-500">BOLOS DECORADOS</p>
        </div>
        
        <button 
          onClick={() => router.push('/cart')}
          className="text-rose-600 hover:text-rose-700 transition-colors"
        >
          <ShoppingCartIcon className="h-6 w-6" />
        </button>
      </header>

      <main className="container mx-auto max-w-md p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Finalize seu Pedido</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações de Entrega */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-700">Informações de Entrega</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="name">
                  Nome Completo
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
                  Endereço de Entrega
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Rua, Número, Bairro"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="phone">
                  Telefone para Contato
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
                  placeholder="Alguma observação sobre a entrega?"
                />
              </div>
            </div>
          </section>

          {/* Resumo do Pedido */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-700">Resumo do Pedido</h3>
            <div className="bg-white p-4 rounded-lg shadow space-y-3">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-700">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <span>R$ {item.price.toFixed(2)}</span>
                </div>
              ))}
              
              <div className="flex justify-between text-gray-700">
                <span>Taxa de Entrega</span>
                <span>R$ {deliveryFee.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-2 mt-2" />
              
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
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
                  <span className="font-medium text-gray-800">PIX</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 ml-7">
                  Pagamento instantâneo com 5% de desconto
                </p>
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

          {/* Botão de Confirmação */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Confirmar Pedido - R$ {total.toFixed(2)}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}