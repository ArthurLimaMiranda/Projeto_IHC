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
import { Footer } from '@/components/Client/Footer';

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

  const handleDecreaseQuantity = (itemId: number, currentQuantity: number) => {
    if (currentQuantity === 1) {
      const confirmRemoval = window.confirm('Deseja remover este item do carrinho?');
      if (confirmRemoval) {
        removeFromCart(itemId);
      }
    } else {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleIncreaseQuantity = (itemId: number, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
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

  const formatExtras = (extras: any[]) => {
    if (!extras || !Array.isArray(extras)) return '';
    
    return extras.map(extra => {
      if (typeof extra === 'string') {
        return extra;
      } else if (extra && typeof extra === 'object') {
        return `${extra.quantity}x ${extra.name}`;
      }
      return '';
    }).filter(Boolean).join(', ');
  };

if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFFF4]">
        <Header />

        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <ShoppingBagIcon className="h-24 w-24 text-rose-500 opacity-60 mb-6" />
          <h2 className="text-2xl font-bold text-[#4F2712] mb-2">Seu carrinho está vazio</h2>
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
    <div className="min-h-screen bg-[#FFFFF4]">
      <Header />
      
      {/* Page Title */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-3xl font-bold text-[#4F2712]">Seu Pedido</h2>
        <p className="text-gray-600 mt-1">{cartItems.length} item(s) no carrinho</p>
      </div>

      {/* Cart Items List */}
      <main className="flex-grow px-4 pb-40">
        {cartItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          
          return (
            <div key={item.id} className="bg-[#B95760] bg-opacity-[25%] p-4 my-4 rounded-xl shadow-sm border flex flex-col items-center border-rose-100">
              <div className="flex flex-row gap-x-5 items-center">
                {/* Imagem aumentada */}
                <div className='flex w-[30%]'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                </div>
                
                <div className="flex flex-1 flex-col">
                  {/* Linha superior: Nome e controles */}
                  <p className="font-semibold text-base text-[#4F2712] leading-tight">
                    {item.name}
                  </p>

                  <div className="flex flex-row justify-between items-center my-3">
                    <span className="text-rose-600 font-semibold text-sm">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                    {/* Controles de quantidade e deletar */}
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border border-rose-200">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <MinusIcon className="h-3 w-3" />
                        </button>
                        
                        <span className="text-base font-medium text-[#4F2712] w-3 text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <PlusIcon className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => {
                          const confirmRemoval = window.confirm('Deseja remover este item do carrinho?');
                          if (confirmRemoval) {
                            removeFromCart(item.id);
                          }
                        }}
                        className="flex-shrink-0 text-rose-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preço abaixo dos controles */}
              <div className="flex justify-between items-center pt-4">
            
                {/* Botão para expandir detalhes */}
                <button
                  onClick={() => toggleItemDetails(item.id)}
                  className="flex items-center gap-1 text-rose-500 text-sm hover:text-rose-600 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUpIcon className="h-4 w-4" />
                      Ocultar detalhes
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="h-4 w-4" />
                      Ver todos detalhes
                    </>
                  )}
                </button>
              </div>

              {/* Detalhes expandidos */}
              {isExpanded && item.customization && (
                <div className="mt-3 pt-3 border-t border-rose-200 w-full">
                  <div className="text-sm text-gray-700 space-y-2">
                    {/* Sabor e cobertura agora dentro dos detalhes expandidos */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <strong className="text-gray-600">Sabor:</strong>
                        <p className="text-[#4F2712]">{item.customization?.flavor}</p>
                      </div>
                      {item.customization?.frosting && item.customization.frosting !== 'Nenhuma' && (
                        <div>
                          <strong className="text-gray-600">Cobertura:</strong>
                          <p className="text-[#4F2712]">{item.customization.frosting}</p>
                        </div>
                      )}
                    </div>

                    {item.customization.toppings && item.customization.toppings.length > 0 && (
                      <div>
                        <strong className="text-gray-600">Toppings:</strong>
                        <p className="text-[#4F2712]">{item.customization.toppings.join(', ')}</p>
                      </div>
                    )}
                    
                    {item.customization.addOns && item.customization.addOns.length > 0 && (
                      <div>
                        <strong className="text-gray-600">Add-Ons:</strong>
                        <p className="text-[#4F2712]">{item.customization.addOns.join(', ')}</p>
                      </div>
                    )}
                    
                    {item.customization.extras && item.customization.extras.length > 0 && (
                      <div>
                        <strong className="text-gray-600">Extras:</strong>
                        <p className="text-[#4F2712]">
                          {formatExtras(item.customization.extras)}
                        </p>
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