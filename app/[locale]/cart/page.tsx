// app/cart/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ShoppingBagIcon 
} from '@heroicons/react/24/outline';

// Dados mockados do carrinho
const initialCartItems = [
  {
    id: 1,
    name: 'Bolo de Cenoura Personalizado',
    description: 'Cobertura de chocolate, 2kg',
    price: 25.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb_b1jWKIxL7lnYTAD__ivawYBWM1w5OpSC1b3rMVajWP4DGfeco-O2Ay8yoaZxqZyEUN97C7OypOcE-tdtXXd_l9qACMdKLMDs0SzQBatCe1J3gms2FOuiXYVw2Lej4c_RgWqnCqMOs0IfpMSehFoZUoaO4jc8hjIt_9uM-kjQ4o9_KhSqOUuRUdNM742EtOEQLI-xjelyeNvKcEMD0V8CLD85xofKkZNiiafEEIIMRQ0ewc3lSwno47kygPebebAowZFbyoXKizH',
    customization: {
      flavor: 'Chocolate',
      frosting: 'Buttercream Clássico',
      toppings: ['Frutas Frescas']
    }
  },
  {
    id: 2,
    name: 'Kit Red Velvet',
    description: '6 cupcakes temáticos',
    price: 32.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb14ENEoM-GV2QzJpRdU-Co5Z2PlgxzBBDiJqUbC8TLtbrK1PVr0tEKBzsWVu9PifUeMifMRySBLfDn6trYkpiMHddAT6ID1Z2oOM42ZnVnX4vU7s4j5OIr3blR6mr-bfwHaYdjo_AHq0wfQ8_9LX1iWV_s6Mti9wEdTkPnVqKEWX4LqqrpW7k1Ex8gb34iKKfoSfwOmZ_XaN8QpbzNOMdA6UCqRckbFOhzMZv5lo0Ecb342jJz9lnRqww8El1Ze3IuBkDj0dDp4x7',
    customization: {
      flavor: 'Red Velvet',
      frosting: 'Cream Cheese',
      toppings: ['Flores Comestíveis']
    }
  },
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 8.00;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/products');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-rose-50 font-display">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 p-4 backdrop-blur-sm border-b border-rose-100">
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 text-rose-600 hover:text-rose-700 transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-rose-600">Juju Bolos Decorados</h1>
          </div>
          
          <div className="w-10 h-10"></div>
        </header>

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
    <div className="min-h-screen bg-rose-50 font-display">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 p-4 backdrop-blur-sm border-b border-rose-100">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 text-rose-600 hover:text-rose-700 transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-rose-600">Juju Bolos Decorados</h1>
        </div>
        
        <div className="w-10 h-10"></div>
      </header>

      {/* Page Title */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-3xl font-bold text-gray-800">Seu Pedido</h2>
        <p className="text-gray-600 mt-1">{cartItems.length} item(s) no carrinho</p>
      </div>

      {/* Cart Items List */}
      <main className="flex-grow px-4 pb-40">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 bg-white p-4 my-4 rounded-xl shadow-sm border border-rose-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="font-semibold text-base text-gray-800">{item.name}</p>
                <p className="text-rose-600/80 text-sm mb-2">{item.description}</p>
                
                {/* Customization Details */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Sabor:</strong> {item.customization.flavor}</p>
                  <p><strong>Cobertura:</strong> {item.customization.frosting}</p>
                  {item.customization.toppings.length > 0 && (
                    <p><strong>Toppings:</strong> {item.customization.toppings.join(', ')}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <p className="text-rose-600 font-bold text-base">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  
                  <span className="text-base font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => removeItem(item.id)}
              className="flex-shrink-0 text-rose-400 hover:text-rose-600 transition-colors self-start"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}

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
              <p className="font-medium text-sm text-right">R$ {subtotal.toFixed(2)}</p>
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