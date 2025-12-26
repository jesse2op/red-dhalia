import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToStorage, getFromStorage } from '../utils/storage';

const AppContext = createContext();

// Default menu items
const defaultMenuItems = [
  // Pastries
  { id: '1', name: 'Chocolate Cake', price: 250, category: 'Pastries' },
  { id: '2', name: 'Tiramisu', price: 280, category: 'Pastries' },
  { id: '3', name: 'Cheesecake', price: 300, category: 'Pastries' },
  // Bakes
  { id: '4', name: 'Croissant', price: 80, category: 'Bakes' },
  { id: '5', name: 'Pain au Chocolat', price: 90, category: 'Bakes' },
  { id: '6', name: 'Choco Chip Cookie', price: 60, category: 'Bakes' },
  { id: '7', name: 'Cinnamon Roll', price: 100, category: 'Bakes' },
  // Breads
  { id: '8', name: 'French Loaf', price: 120, category: 'Breads' },
  { id: '9', name: 'Brioche', price: 150, category: 'Breads' },
  // Beverages
  { id: '10', name: 'Latte', price: 150, category: 'Beverages' },
  { id: '11', name: 'Cappuccino', price: 140, category: 'Beverages' },
  { id: '12', name: 'Espresso', price: 100, category: 'Beverages' },
  { id: '13', name: 'Flat White', price: 160, category: 'Beverages' },
  { id: '14', name: 'Iced Tea – Peach', price: 120, category: 'Beverages' },
  { id: '15', name: 'Iced Tea – Lemon', price: 120, category: 'Beverages' },
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getFromStorage('user', null);
  });

  const [menuItems, setMenuItems] = useState(() => {
    const stored = getFromStorage('menuItems');
    return stored && stored.length > 0 ? stored : defaultMenuItems;
  });

  const [cart, setCart] = useState(() => {
    return getFromStorage('cart', []);
  });

  const [taxSettings, setTaxSettings] = useState(() => {
    return getFromStorage('taxSettings', {
      cgstEnabled: false,
      cgstPercent: 0,
      sgstEnabled: false,
      sgstPercent: 0,
      serviceTaxEnabled: false,
      serviceTaxPercent: 0,
      packingEnabled: false,
    });
  });

  const [toast, setToast] = useState(null);

  const [transactions, setTransactions] = useState(() => {
    return getFromStorage('transactions', []);
  });

  // Sync menu items to localStorage
  useEffect(() => {
    saveToStorage('menuItems', menuItems);
  }, [menuItems]);

  // Sync cart to localStorage
  useEffect(() => {
    saveToStorage('cart', cart);
  }, [cart]);

  // Sync tax settings to localStorage
  useEffect(() => {
    saveToStorage('taxSettings', taxSettings);
  }, [taxSettings]);

  // Sync transactions to localStorage
  useEffect(() => {
    saveToStorage('transactions', transactions);
  }, [transactions]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      saveToStorage('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems([...menuItems, newItem]);
    showToast('Item added successfully!', 'success');
  };

  const updateMenuItem = (id, updatedItem) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
    showToast('Item updated successfully!', 'success');
  };

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    setCart(cart.filter(item => item.id !== id));
    showToast('Item deleted successfully!', 'success');
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    showToast(`${item.name} added to cart!`, 'success');
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showToast('Item removed from cart!', 'success');
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addTransaction = (transactionData) => {
    const transaction = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...transactionData,
    };
    setTransactions([transaction, ...transactions]);
    showToast('Transaction saved successfully!', 'success');
  };

  const login = (role) => {
    setUser({ role, loginTime: new Date().toISOString() });
    showToast(`Logged in as ${role === 'owner' ? 'Owner' : 'Employee'}`, 'success');
  };

  const logout = () => {
    setUser(null);
    setCart([]); // Clear cart on logout
    showToast('Logged out successfully', 'success');
  };

  const value = {
    user,
    menuItems,
    cart,
    taxSettings,
    transactions,
    toast,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setTaxSettings,
    addTransaction,
    showToast,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

