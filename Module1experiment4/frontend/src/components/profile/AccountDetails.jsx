// src/components/profile/AccountDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://localhost:8080/api/customer/details';

export default function AccountDetails() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        shippingAddress: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { token, user, login } = useAuth(); // Get 'login' to update global user state

    const getAuthHeaders = () => ({
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // 1. Fetch current user details on load
    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(API_URL, getAuthHeaders());
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    shippingAddress: response.data.shippingAddress || '' // Handle null address
                });
            } catch (err) {
                setError("Failed to fetch your details.");
            }
            setLoading(false);
        };

        if (token) {
            fetchDetails();
        }
    }, [token]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // 2. Handle the "Save Changes" button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        const updateRequest = {
            name: formData.name,
            email: formData.email,
            shippingAddress: formData.shippingAddress
        };

        try {
            const response = await axios.put(API_URL, updateRequest, getAuthHeaders());

            // 3. Update the global AuthContext user object
            const updatedUser = {
                ...user,
                name: response.data.name,
                email: response.data.email
            };
            // Re-use the login function to update the global state and localStorage
            login(token, user.role, updatedUser);

            setSuccess("Your details have been updated!");
            setFormData(response.data); // Re-sync form with saved data

        } catch (err) {
            setError(err.response?.data || "Failed to update details. Please try again.");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-600">Loading your details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">{success}</p>
                    </div>
                )}

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-2">
                    <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">
                        Default Shipping Address
                    </label>
                    <input
                        type="text"
                        id="shippingAddress"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        value={formData.shippingAddress || ''}
                        placeholder="e.g. 123 Main Street, City, State, ZIP"
                        onChange={handleChange}
                    />
                </div>

                {/* Change Password Section */}
                <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Change Password <span className="text-sm font-normal text-gray-500">(Not Implemented)</span>
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 bg-gray-50 cursor-not-allowed"
                                placeholder="••••••••"
                                disabled
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 bg-gray-50 cursor-not-allowed"
                                placeholder="Minimum 8 characters"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}