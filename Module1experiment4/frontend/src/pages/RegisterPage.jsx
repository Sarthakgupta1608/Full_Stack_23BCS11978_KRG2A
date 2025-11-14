// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/layout/AuthLayout';

const API_URL = 'http://localhost:8080/api/auth';

export default function RegisterPage() {
    const [accountType, setAccountType] = useState('customer');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        storeName: '',
        ownerName: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            let response;
            if (accountType === 'customer') {
                const requestData = {
                    name: formData.ownerName,
                    email: formData.email,
                    password: formData.password
                };
                response = await axios.post(`${API_URL}/register/customer`, requestData);

            } else {
                const requestData = {
                    storeName: formData.storeName,
                    ownerName: formData.ownerName,
                    email: formData.email,
                    password: formData.password
                };
                response = await axios.post(`${API_URL}/register/seller`, requestData);
            }

            setSuccess(response.data);
            setLoading(false);
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setLoading(false);
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <AuthLayout title="Create Your Account">
            <form className="space-y-6" onSubmit={handleSubmit}>

                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        type="button"
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            accountType === 'customer'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setAccountType('customer')}
                    >
                        I'm a Customer
                    </button>
                    <button
                        type="button"
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            accountType === 'seller'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setAccountType('seller')}
                    >
                        I'm a Seller
                    </button>
                </div>

                {accountType === 'seller' && (
                    <div className="space-y-2">
                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                            Store Name
                        </label>
                        <input
                            type="text"
                            id="storeName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                            placeholder="e.g. Artisan Corner"
                            value={formData.storeName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                        {accountType === 'customer' ? 'Full Name' : 'Owner Name'}
                    </label>
                    <input
                        type="text"
                        id="ownerName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        placeholder="e.g. Sarthak Gupta"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 text-center">{success}</p>
                    </div>
                )}

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700 text-center">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}