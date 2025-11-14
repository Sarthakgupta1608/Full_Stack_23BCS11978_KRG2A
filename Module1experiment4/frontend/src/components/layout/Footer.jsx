// src/components/layout/Footer.jsx
import React from 'react';
import { Store } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Store width={24} height={24} className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">ECOHUB</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Empowering local businesses and connecting communities through seamless online shopping.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Quick Links
                        </h4>
                        <div className="space-y-2">
                            {['About Us', 'How It Works', 'Become a Seller', 'Contact'].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="block text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Support
                        </h4>
                        <div className="space-y-2">
                            {['Help Center', 'Terms of Service', 'Privacy Policy', 'FAQs'].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="block text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Newsletter
                        </h4>
                        <p className="text-sm text-gray-400 mb-4">
                            Get the latest deals and updates
                        </p>
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; 2025 ECOHUB. All rights reserved. Made with ❤️ for local communities.
                    </p>
                </div>
            </div>
        </footer>
    );
}