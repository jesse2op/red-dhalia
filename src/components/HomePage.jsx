import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold text-cafe-brown mb-4">
          Welcome to Red Dhalia
        </h1>
        <p className="text-2xl text-cafe-dark-brown mb-8">
          Elegant Dining Experience
        </p>
        <div className="bg-cafe-beige p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <p className="text-lg text-cafe-dark-brown mb-4">
            Welcome to our billing system. Navigate through the menu to:
          </p>
          <ul className="text-left space-y-2 text-cafe-dark-brown">
            <li>✨ Browse our delicious menu items</li>
            <li>🛒 Add items to your cart</li>
            <li>🧾 Generate and print bills</li>
            <li>💳 Pay via UPI QR code</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

