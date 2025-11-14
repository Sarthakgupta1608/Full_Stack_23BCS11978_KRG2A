// src/components/products/ProductInfo.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Star, Minus, Plus, ShoppingCart, Store, CheckCircle } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/cart';

export default function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // 1. Get token, auth state, AND fetchCart
    const { token, isAuthenticated, role, fetchCart } = useAuth();

    const handleQuantityChange = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated || role !== 'ROLE_CUSTOMER') {
            setError("Please log in as a customer to add items.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const requestData = {
                productId: product.productId,
                quantity: quantity
            };
            const headers = { headers: { 'Authorization': `Bearer ${token}` } };

            await axios.post(`${API_URL}/add`, requestData, headers);

            // 2. Refresh the global cart state
            await fetchCart();

            setSuccess(true);
            setLoading(false);
            setTimeout(() => setSuccess(false), 2000);

        } catch (err) {
            setError("Failed to add to cart. Please try again.");
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Seller Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Store width={16} height={16} className="text-gray-400" />
                <span>Sold by: <span className="font-medium text-gray-900">{product.storeName}</span></span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            width={20}
                            height={20}
                            className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                    ))}
                </div>
                <span className="text-sm text-gray-600">(4.0 rating)</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
                {product.description || "No description provided."}
            </p>

            {/* Price */}
            <div className="text-4xl font-bold text-gray-900">
                ₹{product.price.toFixed(2)}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors border-r border-gray-300"
                        aria-label="Decrease quantity"
                    >
                        <Minus width={16} height={16} className="text-gray-700" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-gray-900 min-w-[60px] text-center">
            {quantity}
          </span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors border-l border-gray-300"
                        aria-label="Increase quantity"
                    >
                        <Plus width={16} height={16} className="text-gray-700" />
                    </button>
                </div>

                {/* Add to Cart Button */}
                <button
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                        success
                            ? 'bg-green-600 text-white'
                            : 'bg-primary hover:bg-primary-dark text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handleAddToCart}
                    disabled={loading || success}
                >
                    {loading ? (
                        'Adding...'
                    ) : success ? (
                        <>
                            <CheckCircle width={20} height={20} />
                            <span>Added!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart width={20} height={20} />
                            <span>Add to Cart</span>
                        </>
                    )}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}
        </div>
    );
}