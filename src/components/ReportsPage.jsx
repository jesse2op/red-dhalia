import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#E31837', '#C41E3A', '#FFB6C1', '#8B0000', '#DC143C'];

const ReportsPage = () => {
  const { transactions } = useApp();
  const [period, setPeriod] = useState('daily'); // daily, weekly, monthly

  // Filter transactions based on selected period
  const filteredTransactions = useMemo(() => {
    if (transactions.length === 0) return [];

    const now = new Date();
    const filtered = transactions.filter((t) => {
      const transactionDate = new Date(t.timestamp);
      const diffTime = now - transactionDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      switch (period) {
        case 'daily':
          return diffDays <= 1;
        case 'weekly':
          return diffDays <= 7;
        case 'monthly':
          return diffDays <= 30;
        default:
          return true;
      }
    });

    return filtered;
  }, [transactions, period]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const total = filteredTransactions.reduce((sum, t) => sum + t.grandTotal, 0);
    const count = filteredTransactions.length;
    const average = count > 0 ? total / count : 0;

    return {
      total,
      count,
      average,
    };
  }, [filteredTransactions]);

  // Prepare data for daily chart
  const dailyData = useMemo(() => {
    if (period !== 'daily') return [];

    const dataMap = {};
    filteredTransactions.forEach((t) => {
      const date = new Date(t.timestamp);
      const hour = date.getHours();
      const key = `${hour}:00`;
      if (!dataMap[key]) {
        dataMap[key] = { time: key, amount: 0, count: 0 };
      }
      dataMap[key].amount += t.grandTotal;
      dataMap[key].count += 1;
    });

    return Object.values(dataMap).sort((a, b) => {
      const hourA = parseInt(a.time.split(':')[0]);
      const hourB = parseInt(b.time.split(':')[0]);
      return hourA - hourB;
    });
  }, [filteredTransactions, period]);

  // Prepare data for weekly/monthly chart
  const dateData = useMemo(() => {
    if (period === 'daily') return [];

    const dataMap = {};
    filteredTransactions.forEach((t) => {
      const date = new Date(t.timestamp);
      let key, sortKey;
      if (period === 'weekly') {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        key = dayOfWeek;
        sortKey = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      } else {
        // monthly
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        key = `${day} ${month}`;
        sortKey = date.getTime(); // Use timestamp for sorting
      }

      if (!dataMap[key]) {
        dataMap[key] = { date: key, amount: 0, count: 0, sortKey };
      }
      dataMap[key].amount += t.grandTotal;
      dataMap[key].count += 1;
    });

    return Object.values(dataMap).sort((a, b) => {
      if (period === 'weekly') {
        // Adjust for Sunday being 0, but we want it at the end
        const aDay = a.sortKey === 0 ? 7 : a.sortKey;
        const bDay = b.sortKey === 0 ? 7 : b.sortKey;
        return aDay - bDay;
      }
      return a.sortKey - b.sortKey;
    });
  }, [filteredTransactions, period]);

  // Prepare category-wise data
  const categoryData = useMemo(() => {
    const categoryMap = {};
    filteredTransactions.forEach((t) => {
      t.items.forEach((item) => {
        if (!categoryMap[item.category]) {
          categoryMap[item.category] = { name: item.category, value: 0, count: 0 };
        }
        categoryMap[item.category].value += item.price * item.quantity;
        categoryMap[item.category].count += item.quantity;
      });
    });

    return Object.values(categoryMap).sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  // Prepare top items data
  const topItemsData = useMemo(() => {
    const itemMap = {};
    filteredTransactions.forEach((t) => {
      t.items.forEach((item) => {
        const key = item.name;
        if (!itemMap[key]) {
          itemMap[key] = { name: item.name, value: 0, count: 0 };
        }
        itemMap[key].value += item.price * item.quantity;
        itemMap[key].count += item.quantity;
      });
    });

    return Object.values(itemMap)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [filteredTransactions]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cafe-brown">Reports & Analytics</h1>
        <div className="flex gap-2">
          {['daily', 'weekly', 'monthly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base capitalize ${
                period === p
                  ? 'bg-cafe-brown text-white font-semibold'
                  : 'bg-white text-cafe-dark-brown border-2 border-cafe-brown hover:bg-red-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg sm:text-xl text-gray-500">No transactions found for the selected period.</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-sm sm:text-base text-gray-600 mb-2">Total Revenue</h3>
              <p className="text-2xl sm:text-3xl font-bold text-cafe-brown">₹{summary.total.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-sm sm:text-base text-gray-600 mb-2">Total Transactions</h3>
              <p className="text-2xl sm:text-3xl font-bold text-cafe-dark-brown">{summary.count}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-sm sm:text-base text-gray-600 mb-2">Average Order Value</h3>
              <p className="text-2xl sm:text-3xl font-bold text-cafe-brown">₹{summary.average.toFixed(2)}</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* Sales Over Time Chart */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-cafe-brown mb-4">
                Sales Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                {period === 'daily' ? (
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#E31837"
                      strokeWidth={2}
                      name="Revenue"
                    />
                  </LineChart>
                ) : (
                  <BarChart data={dateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="amount" fill="#E31837" name="Revenue" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-cafe-brown mb-4">
                Sales by Category
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Items Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-cafe-brown mb-4">Top 5 Items</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topItemsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="value" fill="#E31837" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold text-cafe-brown mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-cafe-brown">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-cafe-brown text-xs sm:text-sm">Date & Time</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-cafe-brown text-xs sm:text-sm">Items</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-cafe-brown text-xs sm:text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.slice(0, 10).map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-200">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                        {new Date(transaction.timestamp).toLocaleString('en-IN', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                        {transaction.items.length} item(s)
                      </td>
                      <td className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm">
                        ₹{transaction.grandTotal.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsPage;

