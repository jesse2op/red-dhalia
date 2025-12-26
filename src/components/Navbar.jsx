import React from 'react';
import { useApp } from '../context/AppContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { cart } = useApp();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'items', label: 'Items' },
    { id: 'cart', label: `Cart (${cartItemCount})` },
    { id: 'billing', label: 'Generate Bill' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <nav className="bg-cafe-brown text-white shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-2xl font-bold">🌺 Red Dhalia</div>
          <div className="flex gap-1 sm:gap-2 md:gap-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded-lg transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-white text-cafe-brown font-semibold'
                    : 'hover:bg-cafe-dark-brown'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

