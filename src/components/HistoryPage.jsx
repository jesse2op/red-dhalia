import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';

const HistoryPage = () => {
  const { transactions } = useApp();

  // Sort transactions by date and time (newest first)
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }, [transactions]);

  if (sortedTransactions.length === 0) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text-primary mb-4 sm:mb-6">Bill History</h1>
        <div className="text-center py-12 bg-dark-surface border border-dark-border rounded-lg">
          <p className="text-lg sm:text-xl text-dark-text-secondary">No bills found in history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text-primary mb-4 sm:mb-6">Bill History</h1>

      <div className="space-y-4">
        {sortedTransactions.map((transaction) => {
          const transactionDate = new Date(transaction.timestamp);
          const formattedDate = transactionDate.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          const formattedTime = transactionDate.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={transaction.id}
              className="bg-dark-surface border border-dark-border rounded-lg p-4 sm:p-6 hover:border-cafe-brown/50 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-dark-text-primary">
                    Bill #{transaction.id.slice(-6)}
                  </h3>
                  <p className="text-sm text-dark-text-secondary">
                    {formattedDate} at {formattedTime}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-bold text-cafe-brown">
                    ₹{transaction.grandTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="border-t border-dark-border pt-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-text-secondary">Items:</span>
                    <span className="text-dark-text-primary font-medium">{transaction.items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-text-secondary">Subtotal:</span>
                    <span className="text-dark-text-primary">₹{transaction.subtotal.toFixed(2)}</span>
                  </div>
                  {transaction.taxes && (
                    <>
                      {transaction.taxes.cgst > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-dark-text-secondary">CGST:</span>
                          <span className="text-dark-text-primary">₹{transaction.taxes.cgst.toFixed(2)}</span>
                        </div>
                      )}
                      {transaction.taxes.sgst > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-dark-text-secondary">SGST:</span>
                          <span className="text-dark-text-primary">₹{transaction.taxes.sgst.toFixed(2)}</span>
                        </div>
                      )}
                      {transaction.taxes.serviceTax > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-dark-text-secondary">Service Tax:</span>
                          <span className="text-dark-text-primary">₹{transaction.taxes.serviceTax.toFixed(2)}</span>
                        </div>
                      )}
                    </>
                  )}
                  {transaction.packingCharges > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-text-secondary">Packing Charges:</span>
                      <span className="text-dark-text-primary">₹{transaction.packingCharges.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-dark-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-dark-text-secondary">Grand Total:</span>
                    <span className="text-lg font-bold text-dark-text-primary">
                      ₹{transaction.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Item List */}
                <details className="mt-4">
                  <summary className="text-sm text-cafe-brown cursor-pointer hover:text-cafe-pink">
                    View Items ({transaction.items.length})
                  </summary>
                  <div className="mt-3 space-y-2">
                    {transaction.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm py-2 border-b border-dark-border/50"
                      >
                        <span className="text-dark-text-primary">
                          {item.name} ({item.category}) × {item.quantity}
                        </span>
                        <span className="text-dark-text-secondary">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;

