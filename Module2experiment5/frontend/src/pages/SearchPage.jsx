// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductGrid from '../components/products/ProductGrid';

const API_URL = 'http://localhost:8080/api/products/search';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            setLoading(false);
            return;
        }

        const fetchSearch = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}?q=${encodeURIComponent(query)}`);
                setSearchResults(response.data);
            } catch (err) {
                setError('Search failed. Please try again.');
                console.error(err);
            }
            setLoading(false);
        };

        fetchSearch();
    }, [query]);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Search results for: <span className="text-primary">"{query}"</span>
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Found {searchResults.length} matching products.
                    </p>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-gray-600">Loading results...</p>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <ProductGrid products={searchResults} />
                    ) : (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-gray-600">
                                We couldn't find any products matching your search. Try a different term!
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}