// src/components/home/Features.jsx
import React from 'react';
import { Store, Package, TrendingUp, Users } from 'lucide-react';

const features = [
    { icon: Store, title: 'Local Sellers', desc: 'Support your community businesses' },
    { icon: Package, title: 'Fast Delivery', desc: 'Quick shipping from nearby stores' },
    { icon: TrendingUp, title: 'Best Deals', desc: 'Competitive prices and offers' },
    { icon: Users, title: 'Trusted Platform', desc: 'Secure and reliable marketplace' }
];

export default function Features() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Why Choose Us
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}