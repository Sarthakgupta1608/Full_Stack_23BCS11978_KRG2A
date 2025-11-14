// src/components/layout/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Store, Search, User, Sun, Moon, LogOut } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import SearchModal from '../common/SearchModal';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Get auth state + cart items
    const { isAuthenticated, role, logout, cartItems } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    const isCustomer = isAuthenticated && role === 'ROLE_CUSTOMER';
    const isSeller = isAuthenticated && role === 'ROLE_SELLER';

    // Calculate cart count
    const cartCount = cartItems.length;

    return (
        <>
            <nav className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'} border-b border-gray-200`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                                <Store className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                ECOHUB
              </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                Products
                            </Link>
                            <Link to="/sellers" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                Sellers
                            </Link>
                        </div>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Search"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <Search width={20} height={20} />
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? <Moon width={20} height={20} /> : <Sun width={20} height={20} />}
                            </button>

                            {/* Dynamic Auth Buttons */}
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                        Sign In
                                    </Link>
                                    <Link to="/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {isCustomer && (
                                        <>
                                            <Link to="/profile" className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" aria-label="View profile">
                                                <User width={20} height={20} />
                                            </Link>
                                            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" aria-label="View cart">
                                                <ShoppingCart width={20} height={20} />
                                                {cartCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {cartCount}
                          </span>
                                                )}
                                            </Link>
                                        </>
                                    )}
                                    {isSeller && (
                                        <Link to="/dashboard" className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" aria-label="View dashboard">
                                            <User width={20} height={20} />
                                        </Link>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                        aria-label="Logout"
                                    >
                                        <LogOut width={20} height={20} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMenuOpen ? <X width={24} height={24} /> : <Menu width={24} height={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-4 space-y-2">
                            <button
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                                onClick={() => { setIsSearchOpen(true); closeMobileMenu(); }}
                            >
                                <Search width={18} height={18} />
                                Search
                            </button>

                            <Link to="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors" onClick={closeMobileMenu}>
                                Home
                            </Link>
                            <Link to="/products" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors" onClick={closeMobileMenu}>
                                Products
                            </Link>
                            <Link to="/sellers" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors" onClick={closeMobileMenu}>
                                Sellers
                            </Link>

                            {/* Dynamic Mobile Auth Links */}
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors" onClick={closeMobileMenu}>
                                        Sign In
                                    </Link>
                                    <Link to="/register" className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors text-center" onClick={closeMobileMenu}>
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {isCustomer && (
                                        <>
                                            <Link to="/profile" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors" onClick={closeMobileMenu}>
                                                My Profile
                                            </Link>
                                            <Link to="/cart" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors" onClick={closeMobileMenu}>
                                                My Cart {cartCount > 0 && `(${cartCount})`}
                                            </Link>
                                        </>
                                    )}
                                    {isSeller && (
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors" onClick={closeMobileMenu}>
                                            My Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => { logout(); closeMobileMenu(); }}
                                        className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                                    >
                                        <LogOut width={18} height={18} />
                                        Logout
                                    </button>
                                </>
                            )}

                            <button
                                onClick={toggleTheme}
                                className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                            >
                                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}