// src/components/layout/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';

export default function AuthLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <Link to="/" className="flex items-center justify-center gap-3 mb-8 group">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                        <Store className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            ECOHUB
          </span>
                </Link>

                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                    {title}
                </h2>

                {children}
            </div>
        </div>
    );
}