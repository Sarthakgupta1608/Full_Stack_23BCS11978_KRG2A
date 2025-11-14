// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import OrderHistory from '../components/profile/OrderHistory';
import AccountDetails from '../components/profile/AccountDetails';
import { User } from 'lucide-react';

export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState('orders');

    const renderSection = () => {
        switch (activeSection) {
            case 'orders':
                return <OrderHistory />;
            case 'details':
                return <AccountDetails />;
            case 'settings':
                return (
                    <div className="max-w-3xl">
                        <h2 className="text-2xl font-bold text-gray-900">Settings coming soon...</h2>
                    </div>
                );
            default:
                return <OrderHistory />;
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    <div className="flex items-center gap-3 mb-8">
                        <User className="text-gray-900" width={32} height={32} />
                        <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                    </div>

                    <div className="flex gap-8">
                        <ProfileSidebar
                            activeSection={activeSection}
                            onSelectSection={setActiveSection}
                        />
                        <div className="flex-1">
                            {renderSection()}
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}