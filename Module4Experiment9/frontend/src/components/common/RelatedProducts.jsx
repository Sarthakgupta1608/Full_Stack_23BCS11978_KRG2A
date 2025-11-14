// src/components/common/RelatedProducts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const API_URL = 'http://localhost:8080/api/products';

export default function RelatedProducts({ currentProductId }) {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (!currentProductId) return; // Don't fetch if there's no ID

        const fetchRelated = async () => {
            try {
                // Call the new '/related' endpoint
                const response = await axios.get(`${API_URL}/${currentProductId}/related`);
                setRelatedProducts(response.data);
            } catch (err) {
                console.error("Failed to fetch related products:", err);
            }
        };

        fetchRelated();
    }, [currentProductId]); // Re-fetch if the main product changes

    if (relatedProducts.length === 0) {
        return null; // Don't show the section if no related products
    }

    return (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {/* Render the real related products */}
                {relatedProducts.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </section>
    );
}