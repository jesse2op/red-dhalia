import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';

const ItemsPage = () => {
  const { menuItems } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['All', 'Pastries', 'Bakes', 'Breads', 'Beverages'];

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text-primary">Menu Items</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-cafe-brown text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-cafe-dark-brown transition-colors duration-200 font-semibold text-sm sm:text-base w-full sm:w-auto"
        >
          + Add New Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4 sm:mb-6 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base ${
              selectedCategory === category
                ? 'bg-cafe-brown text-white font-semibold'
                : 'bg-dark-surface text-dark-text-secondary border border-dark-border hover:bg-dark-surface-elevated hover:text-dark-text-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-lg sm:text-xl text-dark-text-secondary">No items found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {showAddForm && <ItemForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default ItemsPage;

