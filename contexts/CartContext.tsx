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

export interface TaxDeclaration {
  id: string;
  year: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: string;
  data: {
    personal: {
      name: string;
      cpf: string;
      email: string;
      phone: string;
    };
    address: {
      street: string;
      city: string;
      state: string;
    };
    business: {
      name: string;
      productTypes: string;
      cnpj?: string;
      cnae?: string;
    };
    financial: {
      monthlyRevenue: number;
      annualRevenue: number;
      totalExpenses: number;
      netProfit: number;
      additionalInfo?: string;
    };
  };
}

export interface TaxReminder {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  completed: boolean;
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
  
  // Funções para agenda
  getOrdersGroupedByDeliveryDate: () => Record<string, Order[]>;
  getOrdersByDeliveryDate: (date: string) => Order[];
  getUpcomingOrders: (days?: number) => Order[];
  getTodayOrders: () => Order[];
  updateOrderDeliveryDate: (orderId: string, newDeliveryDate: string) => boolean;
  // Funções para finanças
  
  addExpense: (expense: Expense) => string;
  getExpenses: () => Expense[];
  getExpensesByPeriod: (startDate: string, endDate: string) => Expense[];
  getExpensesByCategory: (category: string) => Expense[];
  calculateTotalExpenses: (period?: 'day' | 'week' | 'month') => number;
  getFinancialSummary: (period?: 'month' | '30days' | 'year') => FinancialSummary;
  getRevenueVsExpenses: (weeks?: number) => RevenueExpenseData[];
  getProfitEvolution: (months?: number) => ProfitData[];
  saveBusinessInfo: (businessInfo: BusinessInfo) => void;
  getBusinessInfo: () => BusinessInfo | null;

  saveTaxDeclaration: (declaration: Omit<TaxDeclaration, 'id'>) => string;
  getTaxDeclarations: () => TaxDeclaration[];
  getTaxDeclaration: (id: string) => TaxDeclaration | null;
  updateTaxDeclarationStatus: (id: string, status: TaxDeclaration['status']) => boolean;
  getTaxReminders: () => TaxReminder[];
  markReminderAsCompleted: (id: string) => boolean;
  generatePreFilledDeclaration: () => Partial<TaxDeclaration['data']>;
  calculateTaxObligations: (annualRevenue: number) => {
    dasValue: number;
    dueDates: string[];
    observations: string[];
  };
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  subcategory?: string;
  description?: string;
  date: string;
  supplier?: string;
  paymentMethod: string;
  receiptImage?: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  revenueGrowth: number;
  expenseGrowth: number;
  profitGrowth: number;
}

export interface RevenueExpenseData {
  week: string;
  revenue: number;
  expenses: number;
}

export interface ProfitData {
  month: string;
  profit: number;
}

export interface BusinessInfo {
  personal: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
  };
  business: {
    name: string;
    productTypes: string;
    cnpj?: string;
    cnae?: string;
  };
  financial: {
    monthlyRevenue: number;
    annualRevenue: number;
    additionalInfo?: string;
  };
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

  // Funções para agenda
  // Buscar pedidos agrupados por data de entrega
  const getOrdersGroupedByDeliveryDate = (): Record<string, Order[]> => {
    const orders = getAllOrders();
    const grouped: Record<string, Order[]> = {};

    orders.forEach(order => {
      const date = new Date(order.estimatedDelivery).toISOString().split('T')[0]; // YYYY-MM-DD
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(order);
    });

    return grouped;
  };

  // Buscar pedidos por data específica
  const getOrdersByDeliveryDate = (date: string): Order[] => {
    const orders = getAllOrders();
    const targetDate = new Date(date).toISOString().split('T')[0];
    
    return orders.filter(order => {
      const orderDate = new Date(order.estimatedDelivery).toISOString().split('T')[0];
      return orderDate === targetDate;
    });
  };

  // Buscar próximos pedidos (próximos 7 dias)
  const getUpcomingOrders = (days: number = 7): Order[] => {
    const orders = getAllOrders();
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return orders
      .filter(order => {
        const deliveryDate = new Date(order.estimatedDelivery);
        return deliveryDate >= today && deliveryDate <= futureDate;
      })
      .sort((a, b) => new Date(a.estimatedDelivery).getTime() - new Date(b.estimatedDelivery).getTime());
  };

  // Buscar pedidos do dia atual
  const getTodayOrders = (): Order[] => {
    const orders = getAllOrders();
    const today = new Date().toISOString().split('T')[0];
    
    return orders.filter(order => {
      const orderDate = new Date(order.estimatedDelivery).toISOString().split('T')[0];
      return orderDate === today;
    });
  };

  // Atualizar data de entrega de um pedido
  const updateOrderDeliveryDate = (orderId: string, newDeliveryDate: string): boolean => {
    try {
      const orders = getAllOrders();
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          const updatedOrder: Order = {
            ...order,
            estimatedDelivery: newDeliveryDate,
            timeline: [
              ...order.timeline,
              {
                status: 'UPDATED',
                timestamp: new Date().toISOString(),
                description: `Data de entrega alterada para ${new Date(newDeliveryDate).toLocaleDateString('pt-BR')}`
              }
            ]
          };
          return updatedOrder;
        }
        return order;
      });
      
      localStorage.setItem('juju-orders', JSON.stringify(updatedOrders));
      window.dispatchEvent(new Event('storage'));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar data de entrega:', error);
      return false;
    }
  };

  // Funções para finanças
  const addExpense = (expenseData: Omit<Expense, 'id'>): string => {
    const expenses = getExpenses();
    const newExpense: Expense = {
      ...expenseData,
      id: 'EXP' + Date.now().toString().slice(-8),
    };
    
    expenses.push(newExpense);
    localStorage.setItem('juju-expenses', JSON.stringify(expenses));
    window.dispatchEvent(new Event('storage'));
    return newExpense.id;
  };

  const getExpenses = (): Expense[] => {
    try {
      return JSON.parse(localStorage.getItem('juju-expenses') || '[]');
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
      return [];
    }
  };

  const getExpensesByPeriod = (startDate: string, endDate: string): Expense[] => {
    const expenses = getExpenses();
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return expenseDate >= start && expenseDate <= end;
    });
  };

  const getExpensesByCategory = (category: string): Expense[] => {
    const expenses = getExpenses();
    return expenses.filter(expense => expense.category === category);
  };

  const calculateTotalExpenses = (period?: 'day' | 'week' | 'month'): number => {
    const expenses = getExpenses();
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
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    return expenses
      .filter(expense => new Date(expense.date) >= startDate)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getFinancialSummary = (period: 'month' | '30days' | 'year' = 'month'): FinancialSummary => {
    const orders = getAllOrders();
    const expenses = getExpenses();
    const now = new Date();
    
    let startDate: Date;
    let previousStartDate: Date;

    switch (period) {
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case '30days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        previousStartDate = new Date(now);
        previousStartDate.setDate(now.getDate() - 60);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }

    // Calcular dados atuais
    const currentOrders = orders.filter(order => new Date(order.orderDate) >= startDate);
    const currentExpenses = expenses.filter(expense => new Date(expense.date) >= startDate);
    
    const totalRevenue = currentOrders.reduce((sum, order) => sum + order.total, 0);
    const totalExpenses = currentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netProfit = totalRevenue - totalExpenses;

    // Calcular dados do período anterior para crescimento
    const previousOrders = orders.filter(order => 
      new Date(order.orderDate) >= previousStartDate && new Date(order.orderDate) < startDate
    );
    const previousExpenses = expenses.filter(expense => 
      new Date(expense.date) >= previousStartDate && new Date(expense.date) < startDate
    );

    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.total, 0);
    const previousExpensesTotal = previousExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const previousProfit = previousRevenue - previousExpensesTotal;

    // Calcular crescimento percentual
    const revenueGrowth = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    const expenseGrowth = previousExpensesTotal > 0 ? ((totalExpenses - previousExpensesTotal) / previousExpensesTotal) * 100 : 0;
    const profitGrowth = previousProfit > 0 ? ((netProfit - previousProfit) / previousProfit) * 100 : 0;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      revenueGrowth,
      expenseGrowth,
      profitGrowth
    };
  };

  const getRevenueVsExpenses = (weeks: number = 4): RevenueExpenseData[] => {
    const orders = getAllOrders();
    const expenses = getExpenses();
    const result: RevenueExpenseData[] = [];

    for (let i = weeks - 1; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const weekOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= weekStart && orderDate <= weekEnd;
      });

      const weekExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= weekStart && expenseDate <= weekEnd;
      });

      const weekRevenue = weekOrders.reduce((sum, order) => sum + order.total, 0);
      const weekExpensesTotal = weekExpenses.reduce((sum, expense) => sum + expense.amount, 0);

      result.push({
        week: `Sem ${weeks - i}`,
        revenue: weekRevenue,
        expenses: weekExpensesTotal
      });
    }

    return result;
  };

  const getProfitEvolution = (months: number = 6): ProfitData[] => {
    const result: ProfitData[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const summary = getFinancialSummaryForPeriod(month, nextMonth);
      
      result.push({
        month: month.toLocaleDateString('pt-BR', { month: 'short' }),
        profit: summary.netProfit
      });
    }

    return result;
  };

  const getFinancialSummaryForPeriod = (startDate: Date, endDate: Date): FinancialSummary => {
    const orders = getAllOrders();
    const expenses = getExpenses();

    const periodOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= startDate && orderDate < endDate;
    });

    const periodExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate < endDate;
    });

    const totalRevenue = periodOrders.reduce((sum, order) => sum + order.total, 0);
    const totalExpenses = periodExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netProfit = totalRevenue - totalExpenses;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      revenueGrowth: 0,
      expenseGrowth: 0,
      profitGrowth: 0
    };
  };

  const saveBusinessInfo = (businessInfo: BusinessInfo): void => {
    localStorage.setItem('juju-business-info', JSON.stringify(businessInfo));
    window.dispatchEvent(new Event('storage'));
  };

  const getBusinessInfo = (): BusinessInfo | null => {
    try {
      return JSON.parse(localStorage.getItem('juju-business-info') || 'null');
    } catch (error) {
      console.error('Erro ao buscar informações do negócio:', error);
      return null;
    }
  };

  const saveTaxDeclaration = (declarationData: Omit<TaxDeclaration, 'id'>): string => {
    const declarations = getTaxDeclarations();
    const newDeclaration: TaxDeclaration = {
      ...declarationData,
      id: 'DEC' + Date.now().toString().slice(-8),
    };
    
    if (declarationData.status === 'submitted') {
      newDeclaration.submittedAt = new Date().toISOString();
    }
    
    declarations.push(newDeclaration);
    localStorage.setItem('juju-tax-declarations', JSON.stringify(declarations));
    window.dispatchEvent(new Event('storage'));
    return newDeclaration.id;
  };
  const getTaxDeclarations = (): TaxDeclaration[] => {
    try {
      return JSON.parse(localStorage.getItem('juju-tax-declarations') || '[]');
    } catch (error) {
      console.error('Erro ao buscar declarações:', error);
      return [];
    }
  };

  const getTaxDeclaration = (id: string): TaxDeclaration | null => {
    const declarations = getTaxDeclarations();
    return declarations.find(declaration => declaration.id === id) || null;
  };

  const updateTaxDeclarationStatus = (id: string, status: TaxDeclaration['status']): boolean => {
    try {
      const declarations = getTaxDeclarations();
      const updatedDeclarations = declarations.map(declaration => {
        if (declaration.id === id) {
          const updatedDeclaration = {
            ...declaration,
            status,
            ...(status === 'submitted' && !declaration.submittedAt && { 
              submittedAt: new Date().toISOString() 
            })
          };
          return updatedDeclaration;
        }
        return declaration;
      });
      
      localStorage.setItem('juju-tax-declarations', JSON.stringify(updatedDeclarations));
      window.dispatchEvent(new Event('storage'));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status da declaração:', error);
      return false;
    }
  };

  const getTaxReminders = (): TaxReminder[] => {
    try {
      const reminders = JSON.parse(localStorage.getItem('juju-tax-reminders') || '[]');
      
      // Se não houver lembretes, criar alguns padrões
      if (reminders.length === 0) {
        const defaultReminders: TaxReminder[] = [
          {
            id: 'REM1',
            title: 'Pagamento do DAS',
            dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 20).toISOString().split('T')[0],
            description: 'Pagamento mensal do Documento de Arrecadação do Simples Nacional',
            completed: false
          },
          {
            id: 'REM2',
            title: 'Declaração Anual DASN-SIMEI',
            dueDate: new Date(new Date().getFullYear(), 4, 31).toISOString().split('T')[0], // 31 de Maio
            description: 'Declaração anual de faturamento para MEI',
            completed: false
          }
        ];
        localStorage.setItem('juju-tax-reminders', JSON.stringify(defaultReminders));
        return defaultReminders;
      }
      
      return reminders;
    } catch (error) {
      console.error('Erro ao buscar lembretes:', error);
      return [];
    }
  };

  const markReminderAsCompleted = (id: string): boolean => {
    try {
      const reminders = getTaxReminders();
      const updatedReminders = reminders.map(reminder => 
        reminder.id === id ? { ...reminder, completed: true } : reminder
      );
      
      localStorage.setItem('juju-tax-reminders', JSON.stringify(updatedReminders));
      window.dispatchEvent(new Event('storage'));
      return true;
    } catch (error) {
      console.error('Erro ao marcar lembrete como concluído:', error);
      return false;
    }
  };

  const generatePreFilledDeclaration = (): Partial<TaxDeclaration['data']> => {
    const businessInfo = getBusinessInfo();
    const financialSummary = getFinancialSummary('year');
    const expenses = getExpenses();
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      personal: businessInfo?.personal || {
        name: '',
        cpf: '',
        email: '',
        phone: ''
      },
      address: businessInfo?.address || {
        street: '',
        city: '',
        state: ''
      },
      business: businessInfo?.business || {
        name: '',
        productTypes: '',
        cnpj: '',
        cnae: ''
      },
      financial: {
        monthlyRevenue: businessInfo?.financial.monthlyRevenue || 0,
        annualRevenue: financialSummary.totalRevenue,
        totalExpenses: totalExpenses,
        netProfit: financialSummary.netProfit,
        additionalInfo: businessInfo?.financial.additionalInfo || ''
      }
    };
  };

  const calculateTaxObligations = (annualRevenue: number) => {
    // Cálculo simplificado do DAS para MEI (valores de 2024)
    let dasValue = 0;
    
    if (annualRevenue <= 81000) {
      dasValue = 77.10; // Valor fixo para MEI em 2024
    } else {
      // Para faturamento acima do limite MEI (caso tenha ultrapassado)
      dasValue = Math.min(77.10 + (annualRevenue - 81000) * 0.03, 77.10 * 1.5);
    }
    
    const dueDates = [
      '20/' + (new Date().getMonth() + 2).toString().padStart(2, '0') + '/' + new Date().getFullYear(),
      '20/' + (new Date().getMonth() + 3).toString().padStart(2, '0') + '/' + new Date().getFullYear(),
      '20/' + (new Date().getMonth() + 4).toString().padStart(2, '0') + '/' + new Date().getFullYear()
    ];
    
    const observations = [
      'MEI - Microempreendedor Individual',
      'Valor do DAS: R$ ' + dasValue.toFixed(2),
      'Próximo vencimento: ' + dueDates[0],
      annualRevenue > 81000 ? 'ATENÇÃO: Faturamento próximo do limite anual do MEI' : 'Faturamento dentro do limite MEI'
    ];
    
    return {
      dasValue,
      dueDates,
      observations
    };
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
      getPendingOrdersCount,
      // Funções da agenda
      getOrdersGroupedByDeliveryDate,
      getOrdersByDeliveryDate,
      getUpcomingOrders,
      getTodayOrders,
      updateOrderDeliveryDate,
      addExpense,
      getExpenses,
      getExpensesByPeriod,
      getExpensesByCategory,
      calculateTotalExpenses,
      getFinancialSummary,
      getRevenueVsExpenses,
      getProfitEvolution,
      saveBusinessInfo,
      getBusinessInfo,
      saveTaxDeclaration,
      getTaxDeclarations,
      getTaxDeclaration,
      updateTaxDeclarationStatus,
      getTaxReminders,
      markReminderAsCompleted,
      generatePreFilledDeclaration,
      calculateTaxObligations
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