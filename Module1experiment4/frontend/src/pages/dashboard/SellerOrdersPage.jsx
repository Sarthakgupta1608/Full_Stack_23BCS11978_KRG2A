// src/pages/dashboard/SellerOrdersPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Eye, Check, X } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/orders/seller';

export default function SellerOrdersPage() {
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
                setError("Failed to fetch orders.");
                console.error(err);
            }
            setLoading(false);
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-600">Loading orders...</td>
                            </tr>
                        ) : orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">#{order.orderId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(order.orderDate)}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          order.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status.toLowerCase() === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                  order.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800' :
                                      order.status.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800' :
                                          'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.status === 'Pending' ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    aria-label="Accept"
                                                >
                                                    <Check width={16} height={16} />
                                                </button>
                                                <button
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    aria-label="Reject"
                                                >
                                                    <X width={16} height={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                aria-label="View"
                                            >
                                                <Eye width={16} height={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-600">You have not received any orders yet.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}