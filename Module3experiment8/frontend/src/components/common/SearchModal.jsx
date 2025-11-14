// src/components/common/SearchModal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    // Add/remove class to body to prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            onClose();
            setQuery('');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={onClose}
                >
                    <X width={24} height={24} />
                </button>

                {/* Search Form */}
                <form className="relative" onSubmit={handleSubmit}>
                    <div className="relative">
                        <Search
                            width={24}
                            height={24}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search for products, sellers, and more..."
                            className="w-full pl-16 pr-6 py-5 text-lg text-gray-900 placeholder-gray-400 border-b border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                    </div>
                </form>

                {/* Tip */}
                <p className="px-6 py-4 text-sm text-gray-500">
                    Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-medium">Enter</kbd> to search
                </p>
            </div>
        </div>
    );
}