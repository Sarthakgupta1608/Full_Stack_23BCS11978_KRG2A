// src/components/products/ProductGrid.jsx
import React from 'react';
import ProductCard from '../common/ProductCard';

export default function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                    <p className="text-gray-500 text-center text-lg">
                        No products found matching your filters.
                    </p>
                    <p className="text-gray-400 text-center text-sm mt-2">
                        Try adjusting your search criteria
                    </p>
                </div>
            )}
        </div>
    );
}