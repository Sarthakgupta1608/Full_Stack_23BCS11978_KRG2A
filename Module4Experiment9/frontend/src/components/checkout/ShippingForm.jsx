// src/components/checkout/ShippingForm.jsx
import React from 'react';

export default function ShippingForm({ address, onAddressChange }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Shipping Address
            </h2>

            {/* Shipping Form */}
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Street Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        placeholder="123 Main Street, Anytown, ST 12345"
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
                        required
                    />
                </div>
                {/* We can add more fields like city, state, zip later */}
            </div>
        </div>
    );
}