// contexts/CartContext.tsx (atualização)
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
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
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  // Novo: Salvar dados do pedido para rastreamento
  saveOrder: (orderData: any) => void;
  getOrdersByPhone: (phone: string) => any[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('juju-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('juju-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Salvar pedido para rastreamento
  const saveOrder = (orderData: any) => {
    const orders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
    const newOrder = {
      ...orderData,
      id: 'JUJU' + Date.now().toString().slice(-6),
      orderDate: new Date().toISOString(),
      status: 'PENDING',
      timeline: [
        {
          status: 'PENDING',
          timestamp: new Date().toISOString(),
          description: 'Pedido recebido'
        }
      ]
    };
    
    orders.push(newOrder);
    localStorage.setItem('juju-orders', JSON.stringify(orders));
    return newOrder;
  };

  // Buscar pedidos por telefone
  const getOrdersByPhone = (phone: string) => {
    const orders = JSON.parse(localStorage.getItem('juju-orders') || '[]');
    return orders.filter((order: any) => 
      order.customer.phone.replace(/\D/g, '') === phone.replace(/\D/g, '')
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      saveOrder,
      getOrdersByPhone
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};