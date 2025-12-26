import React from 'react';
import { useApp } from '../context/AppContext';

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useApp();

  const handleQuantityChange = (delta) => {
    updateCartQuantity(item.id, item.quantity + delta);
  };

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between animate-fade-in gap-3 sm:gap-0">
      <div className="flex-1 w-full sm:w-auto">
        <h3 className="text-base sm:text-lg font-semibold text-dark-text-primary">{item.name}</h3>
        <p className="text-xs sm:text-sm text-dark-text-secondary">{item.category}</p>
        <p className="text-base sm:text-lg font-bold text-dark-text-primary mt-1 sm:mt-2">
          ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="bg-dark-bg text-cafe-brown w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-cafe-brown hover:bg-dark-surface-elevated transition-colors duration-200 font-bold text-sm sm:text-base"
          >
            −
          </button>
          <span className="text-lg sm:text-xl font-semibold w-6 sm:w-8 text-center text-dark-text-primary">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="bg-dark-bg text-cafe-brown w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-cafe-brown hover:bg-dark-surface-elevated transition-colors duration-200 font-bold text-sm sm:text-base"
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-cafe-brown hover:text-cafe-pink text-lg sm:text-xl"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;

