// QR Code generation utility
import QRCode from 'qrcode';

export const generateUPIString = (amount) => {
  const upiId = 'reddhalia@paytm';
  const payeeName = 'RedDhalia';
  const formattedAmount = amount.toFixed(2);
  
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${formattedAmount}&cu=INR`;
};

export const generateQRCode = async (amount, canvasId) => {
  try {
    const upiString = generateUPIString(amount);
    
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      await QRCode.toCanvas(canvas, upiString, {
        width: 200,
        margin: 2,
        color: {
          dark: '#E31837',
          light: '#FFFFFF',
        },
      });
    }
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

