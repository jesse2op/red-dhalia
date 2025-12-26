import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import TaxControls from './TaxControls';
import {
  calculateSubtotal,
  calculateTaxes,
  calculatePackingCharges,
  calculateGrandTotal,
} from '../utils/calculations';
import { generateQRCode } from '../utils/qrGenerator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BillingPage = ({ setCurrentPage }) => {
  const { cart, taxSettings, addTransaction, clearCart } = useApp();
  const billRef = useRef(null);
  const qrCanvasId = 'qr-code-canvas';

  const subtotal = calculateSubtotal(cart);
  const taxes = calculateTaxes(subtotal, taxSettings);
  const packingCharges = calculatePackingCharges(cart, taxSettings.packingEnabled);
  const grandTotal = calculateGrandTotal(subtotal, taxes, packingCharges);

  useEffect(() => {
    if (cart.length > 0) {
      // Small delay to ensure canvas is rendered
      const timer = setTimeout(() => {
        generateQRCode(grandTotal, qrCanvasId);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [grandTotal, cart.length, qrCanvasId]);

  const saveTransaction = () => {
    const transactionData = {
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
      taxes: {
        cgst: taxes.cgst.amount,
        sgst: taxes.sgst.amount,
        serviceTax: taxes.serviceTax.amount,
      },
      packingCharges,
      grandTotal,
      taxSettings: { ...taxSettings },
    };
    addTransaction(transactionData);
  };

  const handlePrint = () => {
    saveTransaction();
    window.print();
  };

  const handleSavePDF = async () => {
    if (!billRef.current) return;

    try {
      const canvas = await html2canvas(billRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Red-Dhalia-Bill-${new Date().toISOString().split('T')[0]}.pdf`);
      saveTransaction();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleCompleteTransaction = () => {
    saveTransaction();
    clearCart();
    if (setCurrentPage) {
      setCurrentPage('items');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text-primary mb-4 sm:mb-6">Generate Bill</h1>
        <div className="text-center py-8 sm:py-12 bg-dark-surface border border-dark-border rounded-lg">
          <p className="text-lg sm:text-xl text-dark-text-secondary mb-4">Your cart is empty</p>
          <p className="text-sm sm:text-base text-dark-text-secondary">Add items to cart to generate a bill</p>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-text-primary mb-4 sm:mb-6 print-hidden">Generate Bill</h1>

      <div className="print-hidden">
        <TaxControls />
      </div>

      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 print:shadow-none print:bg-white bill-container" ref={billRef}>
        {/* Bill Header */}
        <div className="text-center mb-6 sm:mb-8 border-b-2 border-cafe-brown pb-3 sm:pb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cafe-brown mb-2">🌺 Red Dhalia</h1>
          <p className="text-sm sm:text-base text-gray-600">Elegant Dining Experience</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Date: {currentDate} | Time: {currentTime}
          </p>
        </div>

        {/* Items List */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-cafe-brown">
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-cafe-brown text-sm sm:text-base">Item</th>
                <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-semibold text-cafe-brown text-sm sm:text-base">Qty</th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-cafe-brown text-sm sm:text-base">Unit Price</th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-cafe-brown text-sm sm:text-base">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{item.category}</div>
                    </div>
                  </td>
                  <td className="text-center py-2 sm:py-3 px-2 sm:px-4 text-gray-900 text-sm sm:text-base">{item.quantity}</td>
                  <td className="text-right py-2 sm:py-3 px-2 sm:px-4 text-gray-900 text-sm sm:text-base">₹{item.price.toFixed(2)}</td>
                  <td className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 text-sm sm:text-base">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bill Summary */}
        <div className="border-t-2 border-cafe-brown pt-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
            </div>

            {taxSettings.cgstEnabled && taxes.cgst.amount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  CGST ({taxes.cgst.percent}%):
                </span>
                <span className="font-semibold text-gray-900">₹{taxes.cgst.amount.toFixed(2)}</span>
              </div>
            )}

            {taxSettings.sgstEnabled && taxes.sgst.amount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  SGST ({taxes.sgst.percent}%):
                </span>
                <span className="font-semibold text-gray-900">₹{taxes.sgst.amount.toFixed(2)}</span>
              </div>
            )}

            {taxSettings.serviceTaxEnabled && taxes.serviceTax.amount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Service Tax ({taxes.serviceTax.percent}%):
                </span>
                <span className="font-semibold text-gray-900">₹{taxes.serviceTax.amount.toFixed(2)}</span>
              </div>
            )}

            {taxSettings.packingEnabled && packingCharges > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Packing Charges:</span>
                <span className="font-semibold text-gray-900">₹{packingCharges.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="border-t-2 border-cafe-brown pt-3 sm:pt-4 mt-3 sm:mt-4">
            <div className="flex justify-between text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">Total Amount Payable:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-cafe-brown text-center">
          <p className="text-base sm:text-lg font-semibold text-cafe-brown mb-3 sm:mb-4">Scan to Pay via UPI</p>
          <div className="flex justify-center">
            <canvas id={qrCanvasId} className="border-2 border-cafe-brown rounded-lg max-w-[200px] sm:max-w-none"></canvas>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
            Amount: ₹{grandTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 print-hidden">
        <button
          onClick={handlePrint}
          className="flex-1 bg-cafe-brown text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-cafe-dark-brown transition-colors duration-200 font-semibold text-sm sm:text-base"
        >
          🖨️ Print Bill
        </button>
        <button
          onClick={handleSavePDF}
          className="flex-1 bg-cafe-dark-brown text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-cafe-brown transition-colors duration-200 font-semibold text-sm sm:text-base"
        >
          💾 Save as PDF
        </button>
        <button
          onClick={handleCompleteTransaction}
          className="flex-1 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-sm sm:text-base"
        >
          ✅ Complete Transaction
        </button>
      </div>
    </div>
  );
};

export default BillingPage;

