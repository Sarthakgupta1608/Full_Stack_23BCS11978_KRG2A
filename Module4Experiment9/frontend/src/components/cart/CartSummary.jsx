// src/components/cart/CartSummary.jsx
import React from 'react';

export default function CartSummary({ subtotal, onCheckout }) {
    const shipping = subtotal > 50 ? 0.00 : 4.99;
    const total = subtotal + shipping;

    return (
        <aside className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
            </h2>

            {/* Cost Breakdown List */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Shipping (Est.)</span>
                    <span className="text-gray-900 font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="text-gray-500 text-xs">Calculated at checkout</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button
                onClick={onCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Proceed to Checkout
            </button>
        </aside>
    );
}