// app/cart/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { Header } from '@/components/Client/Header';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const deliveryFee = 8.00;
  const total = getCartTotal() + deliveryFee;

  const toggleItemDetails = (itemId: number) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-rose-50">
        <Header />

        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <ShoppingBagIcon className="h-24 w-24 text-rose-200 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">
            Adicione deliciosos bolos personalizados ao seu carrinho!
          </p>
          <button
            onClick={handleContinueShopping}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50">
      <Header />

      {/* Page Title */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-3xl font-bold text-gray-800">Seu Pedido</h2>
        <p className="text-gray-600 mt-1">{cartItems.length} item(s) no carrinho</p>
      </div>

      {/* Cart Items List */}
      <main className="flex-grow px-4 pb-40">
        {cartItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          
          return (
            <div key={item.id} className="bg-white p-4 my-4 rounded-xl shadow-sm border border-rose-100">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-base text-gray-800">{item.name}</p>
                      <p className="text-rose-600 font-bold text-base mt-1">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      
                      <span className="text-base font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Resumo das customizações */}
                  <div className="mt-2 text-xs text-gray-500">
                    <p><strong>Sabor:</strong> {item.customization?.flavor}</p>
                    {item.customization?.frosting && item.customization.frosting !== 'Nenhuma' && (
                      <p><strong>Cobertura:</strong> {item.customization.frosting}</p>
                    )}
                  </div>

                  {/* Botão para expandir detalhes */}
                  <button
                    onClick={() => toggleItemDetails(item.id)}
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
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex-shrink-0 text-rose-400 hover:text-rose-600 transition-colors self-start"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Detalhes expandidos */}
              {isExpanded && item.customization && (
                <div className="mt-3 pt-3 border-t border-rose-100">
                  <div className="text-sm text-gray-600 space-y-1">
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

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <button
            onClick={handleContinueShopping}
            className="text-rose-600 hover:text-rose-700 font-medium transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </main>

      {/* Sticky Footer for Summary and Checkout */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/95 p-4 rounded-t-2xl backdrop-blur-sm border-t border-rose-100 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Order Summary */}
          <div className="pb-4">
            <div className="flex justify-between gap-x-6 py-1.5">
              <p className="text-gray-600 text-sm">Subtotal</p>
              <p className="font-medium text-sm text-right">R$ {getCartTotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between gap-x-6 py-1.5">
              <p className="text-gray-600 text-sm">Taxa de Entrega</p>
              <p className="font-medium text-sm text-right">R$ {deliveryFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between gap-x-6 py-2 mt-2 border-t border-gray-300 pt-3">
              <p className="font-bold text-base text-gray-800">Total</p>
              <p className="font-bold text-base text-right text-rose-600">
                R$ {total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Checkout CTA Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-6 rounded-xl text-base transition-colors shadow-lg"
          >
            Finalizar Pedido
          </button>
        </div>
      </footer>
    </div>
  );
}