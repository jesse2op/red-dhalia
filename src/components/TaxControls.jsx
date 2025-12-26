import React from 'react';
import { useApp } from '../context/AppContext';

const TaxControls = () => {
  const { taxSettings, setTaxSettings } = useApp();

  const updateTaxSetting = (key, value) => {
    setTaxSettings({ ...taxSettings, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-cafe-brown mb-3 sm:mb-4">Taxes & Charges</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {/* CGST */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="checkbox"
              id="cgst"
              checked={taxSettings.cgstEnabled}
              onChange={(e) => updateTaxSetting('cgstEnabled', e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5 text-cafe-brown focus:ring-cafe-brown"
            />
            <label htmlFor="cgst" className="flex-1 sm:flex-none font-medium text-cafe-dark-brown text-sm sm:text-base">
              CGST (%)
            </label>
          </div>
          {taxSettings.cgstEnabled && (
            <input
              type="number"
              step="0.01"
              min="0"
              value={taxSettings.cgstPercent}
              onChange={(e) => updateTaxSetting('cgstPercent', parseFloat(e.target.value) || 0)}
              className="w-full sm:w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cafe-brown text-sm sm:text-base"
              placeholder="0.00"
            />
          )}
        </div>

        {/* SGST */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="checkbox"
              id="sgst"
              checked={taxSettings.sgstEnabled}
              onChange={(e) => updateTaxSetting('sgstEnabled', e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5 text-cafe-brown focus:ring-cafe-brown"
            />
            <label htmlFor="sgst" className="flex-1 sm:flex-none font-medium text-cafe-dark-brown text-sm sm:text-base">
              SGST (%)
            </label>
          </div>
          {taxSettings.sgstEnabled && (
            <input
              type="number"
              step="0.01"
              min="0"
              value={taxSettings.sgstPercent}
              onChange={(e) => updateTaxSetting('sgstPercent', parseFloat(e.target.value) || 0)}
              className="w-full sm:w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cafe-brown text-sm sm:text-base"
              placeholder="0.00"
            />
          )}
        </div>

        {/* Service Tax */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="checkbox"
              id="serviceTax"
              checked={taxSettings.serviceTaxEnabled}
              onChange={(e) => updateTaxSetting('serviceTaxEnabled', e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5 text-cafe-brown focus:ring-cafe-brown"
            />
            <label htmlFor="serviceTax" className="flex-1 sm:flex-none font-medium text-cafe-dark-brown text-sm sm:text-base">
              Service Tax (%)
            </label>
          </div>
          {taxSettings.serviceTaxEnabled && (
            <input
              type="number"
              step="0.01"
              min="0"
              value={taxSettings.serviceTaxPercent}
              onChange={(e) => updateTaxSetting('serviceTaxPercent', parseFloat(e.target.value) || 0)}
              className="w-full sm:w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cafe-brown text-sm sm:text-base"
              placeholder="0.00"
            />
          )}
        </div>

        {/* Packing Charge */}
        <div className="flex items-center gap-2 sm:gap-4">
          <input
            type="checkbox"
            id="packing"
            checked={taxSettings.packingEnabled}
            onChange={(e) => updateTaxSetting('packingEnabled', e.target.checked)}
            className="w-4 h-4 sm:w-5 sm:h-5 text-cafe-brown focus:ring-cafe-brown"
          />
          <label htmlFor="packing" className="font-medium text-cafe-dark-brown text-xs sm:text-sm md:text-base">
            Packing Charge (₹10 per item for takeaway)
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaxControls;

