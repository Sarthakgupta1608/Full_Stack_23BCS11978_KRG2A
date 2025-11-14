// src/components/cart/CartItem.jsx
import React from 'react';
import { Minus, Plus, Trash2, Package } from 'lucide-react';

export default function CartItem({ item, onRemove, disabled }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Product Info Section */}
            <div className="flex items-start gap-4 flex-1">
                {/* Image Wrapper */}
                <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                    {item.imageUrl ? (
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Package className="text-gray-400" width={24} height={24} />
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span className="text-gray-900 font-medium text-sm sm:text-base truncate">
            {item.name}
          </span>
                    <span className="text-gray-500 text-xs sm:text-sm">
            Sold by: {item.storeName}
          </span>
                    <button
                        className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-medium mt-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit"
                        onClick={() => onRemove(item.cartItemId)}
                        disabled={disabled}
                    >
                        <Trash2 width={16} height={16} />
                        <span>Remove</span>
                    </button>
                </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 w-fit">
                <button
                    className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                    disabled
                >
                    <Minus width={16} height={16} />
                </button>
                <span className="text-gray-900 font-medium text-sm min-w-[2ch] text-center">
          {item.quantity}
        </span>
                <button
                    className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                    disabled
                >
                    <Plus width={16} height={16} />
                </button>
            </div>

            {/* Price Section */}
            <div className="flex flex-col items-end gap-0.5 min-w-[100px]">
        <span className="text-gray-900 font-semibold text-base sm:text-lg">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>
                {item.quantity > 1 && (
                    <span className="text-gray-500 text-xs">
            (₹{item.price.toFixed(2)} each)
          </span>
                )}
            </div>
        </div>
    );
}