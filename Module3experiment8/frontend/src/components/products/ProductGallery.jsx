// src/components/products/ProductGallery.jsx
import React, { useState } from 'react';
import { Package } from 'lucide-react';

export default function ProductGallery({ imageUrl, productName }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // We only have one real image, so we'll use placeholders for thumbnails
    const thumbnails = [imageUrl, null, null, null];

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={productName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Package
                        width={128}
                        height={128}
                        className="text-gray-300"
                    />
                )}
            </div>

            {/* Thumbnail List */}
            <div className="grid grid-cols-4 gap-3">
                {thumbnails.map((img, index) => (
                    <button
                        key={index}
                        className={`aspect-square bg-gray-50 rounded-lg border-2 overflow-hidden flex items-center justify-center transition-all ${
                            index === activeIndex
                                ? 'border-primary ring-2 ring-primary ring-offset-2'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`View image ${index + 1}`}
                    >
                        {index === 0 && imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="thumbnail"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-semibold text-gray-300">?</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}