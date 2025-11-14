// src/components/checkout/CheckoutSummary.jsx
import React from 'react';
import { Package } from 'lucide-react';

export default function CheckoutSummary({ items, subtotal, onPlaceOrder, isLoading }) {
    const shipping = subtotal > 50 ? 0.00 : 4.99;
    const total = subtotal + shipping;

    return (
        <aside className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
            </h2>

            {/* Item List */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                {items.map(item => (
                    <div key={item.cartItemId} className="flex items-center gap-3">
                        {/* Image with Quantity Badge */}
                        <div className="relative flex-shrink-0 w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                            {item.imageUrl ? (
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Package className="text-gray-400" width={20} height={20} />
                            )}
                            <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </span>
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
              <span className="text-sm text-gray-900 font-medium block truncate">
                {item.name}
              </span>
                        </div>

                        {/* Item Price */}
                        <span className="text-sm text-gray-900 font-medium flex-shrink-0">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
                    </div>
                ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="text-gray-900 font-medium">₹0.00</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
            </div>

            {/* Place Order Button */}
            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                onClick={onPlaceOrder}
                disabled={isLoading}
            >
                {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
        </aside>
    );
}