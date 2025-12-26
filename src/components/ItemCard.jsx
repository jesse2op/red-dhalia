import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ItemForm from './ItemForm';

const ItemCard = ({ item }) => {
  const { addToCart, deleteMenuItem } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      deleteMenuItem(item.id);
    }
  };

  if (isEditing) {
    return <ItemForm item={item} onClose={() => setIsEditing(false)} />;
  }

  return (
    <div className="bg-dark-surface rounded-lg border border-dark-border p-4 sm:p-6 hover:border-cafe-brown/50 transition-all duration-300 animate-fade-in">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-dark-text-primary truncate">{item.name}</h3>
          <p className="text-xs sm:text-sm text-dark-text-secondary mt-1">{item.category}</p>
        </div>
        <div className="flex gap-1 sm:gap-2 ml-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm"
            aria-label="Edit item"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="text-cafe-brown hover:text-cafe-pink text-xs sm:text-sm"
            aria-label="Delete item"
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <span className="text-xl sm:text-2xl font-bold text-dark-text-primary">
          ₹{item.price}
        </span>
        <button
          onClick={() => addToCart(item)}
          className="w-full sm:w-auto bg-cafe-brown text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-cafe-dark-brown transition-colors duration-200 text-sm sm:text-base"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;

