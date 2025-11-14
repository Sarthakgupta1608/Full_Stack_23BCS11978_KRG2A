// src/components/dashboard/DashboardSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft, Store } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardSidebar() {
    const { user, logout } = useAuth();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
            {/* Store Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Store width={20} height={20} className="text-blue-600" />
                    </div>
                    <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-gray-900 truncate">
              {user?.storeName || 'My Store'}
            </span>
                        <span className="text-xs text-gray-500">Pro Plan</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-6">
                <div className="space-y-1">
          <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Menu
          </span>

                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <LayoutDashboard width={20} height={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/products"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <Package width={20} height={20} />
                        <span>My Products</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/orders"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <ShoppingCart width={20} height={20} />
                        <span>Orders</span>
                    </NavLink>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                >
                    <ArrowLeft width={16} height={16} />
                    <span>Logout & Exit</span>
                </button>
            </div>
        </aside>
    );
}