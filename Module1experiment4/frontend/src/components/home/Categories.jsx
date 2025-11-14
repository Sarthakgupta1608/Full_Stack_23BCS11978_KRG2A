// src/components/home/Categories.jsx
import React, { useState } from 'react';

const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Food & Beverages'];
const categoryEmojis = ['💻', '👗', '🏡', '🍕'];

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    Browse by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveCategory(idx)}
                            className={`
                relative p-6 rounded-xl cursor-pointer transition-all duration-200
                ${activeCategory === idx
                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-900 hover:shadow-md hover:scale-102 border border-gray-200'
                            }
              `}
                        >
                            <div className="text-4xl mb-3 text-center">
                                {categoryEmojis[idx]}
                            </div>
                            <div className="text-sm font-medium text-center">
                                {cat}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}