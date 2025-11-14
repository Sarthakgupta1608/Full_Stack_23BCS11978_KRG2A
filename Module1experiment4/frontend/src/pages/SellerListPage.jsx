// src/pages/SellerListPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const API_URL = 'http://localhost:8080/api/sellers';

export default function SellerListPage() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSellers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(API_URL);
                setSellers(response.data);
            } catch (err) {
                setError('Failed to fetch sellers. Please try again.');
                console.error(err);
            }
            setLoading(false);
        };

        fetchSellers();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-600">Loading sellers...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            );
        }

        if (sellers.length > 0) {
            return (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Data successfully fetched from H2:
                    </h3>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(sellers, null, 2)}
          </pre>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-600">No sellers have registered yet.</p>
            </div>
        );
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse All Sellers</h1>
                    {renderContent()}
                </div>
            </main>
            <Footer />
        </>
    );
}