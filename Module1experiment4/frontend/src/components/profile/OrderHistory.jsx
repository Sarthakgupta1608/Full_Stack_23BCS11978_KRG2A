// src/components/profile/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Package, ChevronRight } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/orders/customer';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = { headers: { 'Authorization': `Bearer ${token}` } };
                const response = await axios.get(API_URL, headers);
                setOrders(response.data);
            } catch (err) {
                setError("Failed to fetch order history.");
                console.error(err);
            }
            setLoading(false);
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    // Helper to format the date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-5xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

            {loading && (
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-600">Loading orders...</p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <div className="space-y-4">
                {!loading && orders.length === 0 && (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-600">You haven't placed any orders yet.</p>
                    </div>
                )}

                {orders.map((order) => (
                    <div key={order.orderId} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Order ID</span>
                                <span className="text-sm font-semibold text-gray-900 mt-0.5">#{order.orderId}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Date Placed</span>
                                <span className="text-sm font-semibold text-gray-900 mt-0.5">{formatDate(order.orderDate)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Total Amount</span>
                                <span className="text-sm font-semibold text-gray-900 mt-0.5">${order.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                                order.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status.toLowerCase() === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                        order.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                            }`}>
                                {order.status}
                            </div>
                        </div>
                        <div className="px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0"
                                        title={item.productName}
                                    >
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                                        ) : (
                                            <Package width={20} height={20} className="text-gray-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark hover:bg-gray-50 rounded-lg transition-colors">
                                <span>View Details</span>
                                <ChevronRight width={16} height={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}