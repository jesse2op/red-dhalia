import React from 'react';
import { useApp } from '../context/AppContext';
import CartItem from './CartItem';
import { calculateSubtotal } from '../utils/calculations';

const CartPage = ({ setCurrentPage }) => {
  const { cart, clearCart } = useApp();
  const subtotal = calculateSubtotal(cart);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cafe-brown mb-4 sm:mb-6">Shopping Cart</h1>
        <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg sm:text-xl text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => setCurrentPage('items')}
            className="bg-cafe-brown text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-cafe-dark-brown transition-colors duration-200 text-sm sm:text-base"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cafe-brown">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm sm:text-base"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4">
            <h2 className="text-xl sm:text-2xl font-bold text-cafe-brown mb-3 sm:mb-4">Order Summary</h2>
            <div className="space-y-2 mb-3 sm:mb-4">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t pt-3 sm:pt-4 mb-3 sm:mb-4">
              <div className="flex justify-between text-lg sm:text-xl font-bold text-cafe-dark-brown">
                <span>Total:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('billing')}
              className="w-full bg-cafe-brown text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-cafe-dark-brown transition-colors duration-200 font-semibold text-sm sm:text-base"
            >
              Proceed to Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

