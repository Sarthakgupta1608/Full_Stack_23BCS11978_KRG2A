// src/pages/dashboard/SellerDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { DollarSign, ShoppingCart, Package, Activity } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/dashboard';

export default function SellerDashboardPage() {
    const { user, token } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = { headers: { 'Authorization': `Bearer ${token}` } };
                const response = await axios.get(`${API_URL}/stats`, headers);
                setStats(response.data);
            } catch (err) {
                setError("Failed to load dashboard stats.");
                console.error(err);
            }
            setLoading(false);
        };

        if (token) {
            fetchStats();
        }
    }, [token]);

    const statCards = [
        {
            title: 'Total Revenue',
            value: `$${stats?.totalRevenue.toFixed(2) || '0.00'}`,
            icon: DollarSign,
            color: 'text-green-600',
            bg: 'bg-green-100'
        },
        {
            title: 'Total Orders',
            value: stats?.totalOrders.toString() || '0',
            icon: ShoppingCart,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            title: 'Total Products',
            value: stats?.totalProducts.toString() || '0',
            icon: Package,
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        },
        {
            title: 'Conversion Rate',
            value: '4.8%',
            icon: Activity,
            color: 'text-orange-600',
            bg: 'bg-orange-100'
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {user?.storeName}!</h1>
                <p className="text-gray-600 mt-2">Here's a snapshot of your store's performance.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.title} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-600">{stat.title}</span>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon width={20} height={20} className={stat.color} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {loading ? '...' : stat.value}
                        </div>
                        <div className="text-sm text-green-600">
                            +0.0% vs. last month
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
                <p className="text-gray-600">
                    {loading ? 'Loading...' : 'Your recent orders will appear here.'}
                </p>
            </div>
        </div>
    );
}