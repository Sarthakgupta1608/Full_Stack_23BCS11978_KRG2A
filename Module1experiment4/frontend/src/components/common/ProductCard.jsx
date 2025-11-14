// src/components/common/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Package } from 'lucide-react';

export default function ProductCard({ product }) {
    const handleCartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Added to cart:", product.name);
        // TODO: Add cart logic here
    };

    return (
        <Link
            to={`/products/${product.productId}`}
            className="block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
        >
            <div className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Package className="text-gray-400" width={48} height={48} />
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-4">
                    {/* Store Name */}
                    <div className="text-xs text-gray-500 mb-1 truncate">
                        {product.storeName}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                width={14}
                                height={14}
                                className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
                            />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                    </div>

                    {/* Footer: Price + Cart Button */}
                    <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
                        <button
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={handleCartClick}
                            aria-label="Add to cart"
                        >
                            <ShoppingCart width={18} height={18} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}