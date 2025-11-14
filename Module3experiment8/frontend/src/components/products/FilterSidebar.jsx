// src/components/products/FilterSidebar.jsx
import React from 'react';
import { Star } from 'lucide-react';

const ratings = [4, 3, 2, 1];

export default function FilterSidebar({
                                          categories,
                                          selectedCategories,
                                          onCategoryChange,
                                          price,
                                          onPriceChange,
                                          selectedRating,
                                          onRatingChange,
                                          onClearFilters
                                      }) {

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto scrollbar-thin">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                    onClick={onClearFilters}
                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                    Clear All
                </button>
            </div>

            {/* Categories Filter */}
            <div className="p-6 border-b border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Category</h4>
                <div className="space-y-3">
                    {categories.map((category) => (
                        <label
                            key={category}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => onCategoryChange(category)}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                {category}
              </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="p-6 border-b border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Price</h4>
                <div className="space-y-3">
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={price}
                        onChange={(e) => onPriceChange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="text-sm text-gray-700">
                        Up to: <span className="font-semibold text-gray-900">₹{price}</span>
                    </div>
                </div>
            </div>

            {/* Rating Filter */}
            <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Rating</h4>
                <div className="space-y-2">
                    {ratings.map((r) => (
                        <button
                            key={r}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedRating === r
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                            onClick={() => onRatingChange(r)}
                        >
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        width={16}
                                        height={16}
                                        className={
                                            i < r
                                                ? selectedRating === r
                                                    ? 'fill-white text-white'
                                                    : 'fill-yellow-400 text-yellow-400'
                                                : selectedRating === r
                                                    ? 'text-white'
                                                    : 'text-gray-300'
                                        }
                                    />
                                ))}
                            </div>
                            <span>& Up</span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}