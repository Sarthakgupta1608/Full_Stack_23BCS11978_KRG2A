// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { ShoppingBag } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/cart';

export default function CartPage() {
    const { token, cartItems, fetchCart } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );

    const handleRemoveItem = async (cartItemId) => {
        setLoading(true);
        setError(null);
        try {
            const headers = { headers: { 'Authorization': `Bearer ${token}` } };
            await axios.delete(`${API_URL}/item/${cartItemId}`, headers);
            await fetchCart();
        } catch (err) {
            setError('Failed to remove item. Please try again.');
        }
        setLoading(false);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <ShoppingBag className="text-gray-900" width={32} height={32} />
                        <h1 className="text-3xl font-bold text-gray-900">Your Cart ({cartItems.length} items)</h1>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.cartItemId}
                                        item={item}
                                        onRemove={handleRemoveItem}
                                        disabled={loading}
                                    />
                                ))}
                            </div>
                            <div className="lg:col-span-1">
                                <CartSummary
                                    subtotal={subtotal}
                                    onCheckout={handleCheckout}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
                            <ShoppingBag className="mx-auto text-gray-300 mb-4" width={64} height={64} />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                            <Link
                                to="/products"
                                className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}