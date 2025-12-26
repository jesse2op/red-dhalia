import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const ItemForm = ({ item = null, onClose }) => {
  const { addMenuItem, updateMenuItem } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Pastries',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        price: item.price.toString(),
        category: item.category,
      });
    }
  }, [item]);

  const categories = ['Pastries', 'Bakes', 'Breads', 'Beverages'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    const itemData = {
      name: formData.name.trim(),
      price: price,
      category: formData.category,
    };

    if (item) {
      updateMenuItem(item.id, itemData);
    } else {
      addMenuItem(itemData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md animate-slide-in max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-cafe-brown mb-3 sm:mb-4">
          {item ? 'Edit Item' : 'Add New Item'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-cafe-dark-brown mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cafe-brown focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-cafe-dark-brown mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cafe-brown focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-cafe-dark-brown mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cafe-brown focus:border-transparent text-sm sm:text-base"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button
              type="submit"
              className="flex-1 bg-cafe-brown text-white px-4 py-2 rounded-lg hover:bg-cafe-dark-brown transition-colors duration-200 text-sm sm:text-base"
            >
              {item ? 'Update' : 'Add'} Item
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;

