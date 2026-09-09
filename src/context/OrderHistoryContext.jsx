import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderHistoryContext = createContext(null);

const STORAGE_KEY = 'shoppy_orders';

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function OrderHistoryProvider({ children }) {
  const { currentUser } = useAuth();
  const [allOrders, setAllOrders] = useState(loadOrders);

  // Reload from storage whenever user changes
  useEffect(() => {
    setAllOrders(loadOrders());
  }, [currentUser]);

  const userEmail = currentUser?.email || '__guest__';
  const orders = allOrders[userEmail] || [];

  function addOrder({ cartItems, cartTotal, shippingInfo, paymentMethod }) {
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cartItems.map(i => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        thumbnail: i.thumbnail,
      })),
      total: cartTotal,
      shippingInfo,
      paymentMethod,
      status: 'Confirmed',
    };

    setAllOrders(prev => {
      const updated = {
        ...prev,
        [userEmail]: [order, ...(prev[userEmail] || [])],
      };
      saveOrders(updated);
      return updated;
    });

    return order;
  }

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  return useContext(OrderHistoryContext);
}
