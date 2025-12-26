import React from 'react';
import { useApp } from '../context/AppContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { cart, user, logout } = useApp();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Role-based navigation items
  const allNavItems = [
    { id: 'items', label: 'Items', roles: ['employee', 'owner'] },
    { id: 'cart', label: `Cart (${cartItemCount})`, roles: ['employee', 'owner'] },
    { id: 'billing', label: 'Generate Bill', roles: ['employee', 'owner'] },
    { id: 'history', label: 'History', roles: ['employee', 'owner'] },
    { id: 'reports', label: 'Reports', roles: ['owner'] }, // Only owners can access reports
  ];

  // Filter navigation items based on user role
  const navItems = allNavItems.filter(item => 
    item.roles.includes(user?.role)
  );

  const userRoleLabel = user?.role === 'owner' ? 'Owner' : 'Employee';

  return (
    <nav className="bg-dark-surface border-b border-dark-border shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-2xl font-bold text-dark-text-primary">🌺 Red Dhalia</div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <div className="flex gap-1 sm:gap-2 md:gap-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded-lg transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-cafe-brown text-white font-semibold'
                      : 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-surface-elevated'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-2 sm:ml-4 border-l border-dark-border pl-2 sm:pl-4">
              <span className="text-xs sm:text-sm text-dark-text-secondary hidden sm:inline">
                {userRoleLabel}
              </span>
              <button
                onClick={logout}
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded-lg transition-all duration-300 bg-cafe-brown hover:bg-cafe-dark-brown text-white"
                title="Logout"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

