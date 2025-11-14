// src/pages/ProductListPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FilterSidebar from '../components/products/FilterSidebar';
import ProductGrid from '../components/products/ProductGrid';
import { SlidersHorizontal } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/products';
const allCategories = ['Electronics', 'Food', 'Homeware', 'Fashion'];
const MAX_PRICE = 200;

export default function ProductListPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState(MAX_PRICE);
    const [selectedRating, setSelectedRating] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(API_URL);
                setAllProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products. Please try again.');
                console.error(err);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleRatingChange = (rating) => {
        setSelectedRating((prev) => (prev === rating ? null : rating));
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setPrice(MAX_PRICE);
        setSelectedRating(null);
    };

    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
                return false;
            }
            if (product.price > price) {
                return false;
            }
            return true;
        });
    }, [allProducts, selectedCategories, price, selectedRating]);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-3 mb-8">
                        <SlidersHorizontal className="text-gray-900" width={32} height={32} />
                        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="flex gap-8">
                        <FilterSidebar
                            categories={allCategories}
                            selectedCategories={selectedCategories}
                            onCategoryChange={handleCategoryChange}
                            price={price}
                            onPriceChange={setPrice}
                            selectedRating={selectedRating}
                            onRatingChange={handleRatingChange}
                            onClearFilters={handleClearFilters}
                        />
                        <div className="flex-1">
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <p className="text-gray-600">Loading products...</p>
                                </div>
                            ) : (
                                <ProductGrid products={filteredProducts} />
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}