// contexts/CartContext.tsx
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

export interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
  estimatedDelivery: string;
  status: 'PENDING' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  timeline: Array<{
    status: string;
    timestamp: string;
    description: string;
  }>;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  
  // Funções para pedidos
  saveOrder: (orderData: any) => Order;
  getOrdersByPhone: (phone: string) => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, newStatus: Order['status']) => boolean;
  getOrderById: (orderId: string) => Order | null;
  getOrdersByStatus: (status: Order['status']) => Order[];
  calculateRevenue: (period?: 'day' | 'week' | 'month') => number;
  getPendingOrdersCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('juju-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('juju-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, [cartItems]);

  // Gerenciamento do carrinho
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

  // Funções para pedidos - Gerenciamento completo
  const getAllOrders = (): Order[] => {
    try {
      return JSON.parse(localStorage.getItem('juju-orders') || '[]');
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return [];
    }
  };

  // Salvar pedido para rastreamento
  const saveOrder = (orderData: any): Order => {
    const orders = getAllOrders();
    const newOrder: Order = {
      ...orderData,
      id: 'JUJU' + Date.now().toString().slice(-8),
      orderDate: new Date().toISOString(),
      status: 'PENDING' as const,
      timeline: [
        {
          status: 'PENDING',
          timestamp: new Date().toISOString(),
          description: 'Pedido recebido e confirmado'
        }
      ]
    };
    
    // Verificar se já existe um pedido com o mesmo ID
    const orderExists = orders.some((order: Order) => order.id === newOrder.id);
    if (!orderExists) {
      orders.push(newOrder);
      try {
        localStorage.setItem('juju-orders', JSON.stringify(orders));
        // Disparar evento para outros componentes
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Erro ao salvar pedido:', error);
      }
    }
    
    return newOrder;
  };

  // Buscar pedidos por telefone
  const getOrdersByPhone = (phone: string): Order[] => {
    const orders = getAllOrders();
    const formattedPhone = phone.replace(/\D/g, '');
    return orders.filter(order => 
      order.customer.phone.replace(/\D/g, '') === formattedPhone
    );
  };

  // Buscar pedido por ID
  const getOrderById = (orderId: string): Order | null => {
    const orders = getAllOrders();
    return orders.find(order => order.id === orderId) || null;
  };

  // Buscar pedidos por status
  const getOrdersByStatus = (status: Order['status']): Order[] => {
    const orders = getAllOrders();
    return orders.filter(order => order.status === status);
  };

  // Atualizar status do pedido
  const updateOrderStatus = (orderId: string, newStatus: Order['status']): boolean => {
    try {
      const orders = getAllOrders();
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          const updatedOrder: Order = {
            ...order,
            status: newStatus,
            timeline: [
              ...order.timeline,
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                description: getStatusDescription(newStatus)
              }
            ]
          };
          return updatedOrder;
        }
        return order;
      });
      
      localStorage.setItem('juju-orders', JSON.stringify(updatedOrders));
      // Disparar evento para atualizar outros componentes
      window.dispatchEvent(new Event('storage'));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return false;
    }
  };

  const getStatusDescription = (status: Order['status']): string => {
    switch (status) {
      case 'PENDING': return 'Pedido recebido';
      case 'PREPARING': return 'Pedido em produção';
      case 'OUT_FOR_DELIVERY': return 'Pedido saiu para entrega';
      case 'DELIVERED': return 'Pedido entregue';
      default: return 'Status atualizado';
    }
  };

  // Calcular receita por período
  const calculateRevenue = (period: 'day' | 'week' | 'month' = 'week'): number => {
    const orders = getAllOrders();
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
    }

    return orders
      .filter(order => new Date(order.orderDate) >= startDate)
      .reduce((total, order) => total + order.total, 0);
  };

  // Contar pedidos pendentes
  const getPendingOrdersCount = (): number => {
    const orders = getAllOrders();
    return orders.filter(order => 
      order.status === 'PENDING' || order.status === 'PREPARING'
    ).length;
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
      getOrdersByPhone,
      getAllOrders,
      updateOrderStatus,
      getOrderById,
      getOrdersByStatus,
      calculateRevenue,
      getPendingOrdersCount
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