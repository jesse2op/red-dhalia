// Calculation utilities for taxes and totals

export const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

export const calculateTaxes = (subtotal, taxSettings) => {
  const taxes = {
    cgst: { percent: 0, amount: 0 },
    sgst: { percent: 0, amount: 0 },
    serviceTax: { percent: 0, amount: 0 },
  };

  if (taxSettings.cgstEnabled) {
    taxes.cgst.percent = taxSettings.cgstPercent;
    taxes.cgst.amount = (subtotal * taxSettings.cgstPercent) / 100;
  }

  if (taxSettings.sgstEnabled) {
    taxes.sgst.percent = taxSettings.sgstPercent;
    taxes.sgst.amount = (subtotal * taxSettings.sgstPercent) / 100;
  }

  if (taxSettings.serviceTaxEnabled) {
    taxes.serviceTax.percent = taxSettings.serviceTaxPercent;
    taxes.serviceTax.amount = (subtotal * taxSettings.serviceTaxPercent) / 100;
  }

  return taxes;
};

export const calculatePackingCharges = (cartItems, packingEnabled) => {
  if (!packingEnabled) return 0;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return totalItems * 10; // ₹10 per item
};

export const calculateGrandTotal = (subtotal, taxes, packingCharges) => {
  const totalTaxes = taxes.cgst.amount + taxes.sgst.amount + taxes.serviceTax.amount;
  return subtotal + totalTaxes + packingCharges;
};

