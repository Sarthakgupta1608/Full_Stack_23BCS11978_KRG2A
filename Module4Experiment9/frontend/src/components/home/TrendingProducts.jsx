// src/components/home/TrendingProducts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../common/ProductCard';

const API_URL = 'http://localhost:8080/api/products';

export default function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all products
        const fetchTrending = async () => {
            try {
                const response = await axios.get(API_URL);
                // Take the first 4 as "trending"
                setProducts(response.data.slice(0, 4));
            } catch (err) {
                console.error("Failed to fetch trending products:", err);
            }
            setLoading(false);
        };

        fetchTrending();
    }, []);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Trending Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        <div className="col-span-full flex items-center justify-center py-12">
                            <p className="text-gray-500">Loading...</p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}