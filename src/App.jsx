import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import ItemsPage from './components/ItemsPage';
import CartPage from './components/CartPage';
import BillingPage from './components/BillingPage';
import HistoryPage from './components/HistoryPage';
import ReportsPage from './components/ReportsPage';
import LoginPage from './components/LoginPage';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent = () => {
  const { user, login } = useApp();
  const [currentPage, setCurrentPage] = useState('items');

  // All hooks must be called before any conditional returns
  // Redirect employees away from restricted pages (Reports only)
  useEffect(() => {
    if (user?.role === 'employee' && currentPage === 'reports') {
      setCurrentPage('items');
    }
  }, [user?.role, currentPage]);

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'items':
        return <ItemsPage />;
      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />;
      case 'billing':
        return <BillingPage setCurrentPage={setCurrentPage} />;
      case 'history':
        return <HistoryPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <ItemsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="min-h-[calc(100vh-80px)]">
        {renderPage()}
      </main>
      <Toast />
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;

