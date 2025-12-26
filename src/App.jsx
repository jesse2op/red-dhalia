import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import ItemsPage from './components/ItemsPage';
import CartPage from './components/CartPage';
import BillingPage from './components/BillingPage';
import ReportsPage from './components/ReportsPage';
import Toast from './components/Toast';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('items');

  const renderPage = () => {
    switch (currentPage) {
      case 'items':
        return <ItemsPage />;
      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />;
      case 'billing':
        return <BillingPage setCurrentPage={setCurrentPage} />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <ItemsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Toast />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

