// src/components/profile/ProfileSidebar.jsx
import React from 'react';
import { User, List, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProfileSidebar({ activeSection, onSelectSection }) {
    const { user, logout } = useAuth();

    const menuItems = [
        { id: 'details', name: 'Account Details', icon: User },
        { id: 'orders', name: 'Order History', icon: List },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="p-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-600">{user?.email || '...'}</p>
                </div>
            </div>
            <nav className="p-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            activeSection === item.id
                                ? 'bg-primary text-white'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => onSelectSection(item.id)}
                    >
                        <item.icon width={20} height={20} />
                        <span>{item.name}</span>
                    </button>
                ))}
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-2"
                    onClick={logout}
                >
                    <LogOut width={20} height={20} />
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    );
}