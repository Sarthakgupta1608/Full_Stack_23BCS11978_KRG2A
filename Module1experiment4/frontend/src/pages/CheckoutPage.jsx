// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentMethod from '../components/checkout/PaymentMethod';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import { Lock } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/cart';

export default function CheckoutPage() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shippingAddress, setShippingAddress] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const { token, user } = useAuth();
    const navigate = useNavigate();

    const getAuthHeaders = () => ({
        headers: { 'Authorization': `Bearer ${token}` }
    });

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(API_URL, getAuthHeaders());
                setCart(response.data);
            } catch (err) {
                setError('Failed to fetch your cart.');
            }
            setLoading(false);
        };

        if (token) {
            fetchCart();
            if (user?.address) {
                setShippingAddress(user.address);
            }
        }
    }, [token, user]);

    const handlePlaceOrder = async () => {
        if (!shippingAddress) {
            setError("Please enter a shipping address.");
            return;
        }

        setIsPlacingOrder(true);
        setError(null);

        try {
            const requestData = { shippingAddress };
            await axios.post(`${API_URL}/checkout`, requestData, getAuthHeaders());

            setIsPlacingOrder(false);
            navigate('/profile');

        } catch (err) {
            setIsPlacingOrder(false);
            setError(err.response?.data || "Checkout failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center py-12">
                            <p className="text-gray-600">Loading checkout...</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-8">
                        <Lock className="text-gray-900" width={32} height={32} />
                        <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <ShippingForm
                                address={shippingAddress}
                                onAddressChange={setShippingAddress}
                            />
                            <PaymentMethod />
                        </div>
                        <div className="lg:col-span-1">
                            <CheckoutSummary
                                items={cart?.items || []}
                                subtotal={cart?.subtotal || 0}
                                onPlaceOrder={handlePlaceOrder}
                                isLoading={isPlacingOrder}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}