// src/components/checkout/PaymentMethod.jsx
import React from 'react';
import { CreditCard, Landmark, ShieldCheck } from 'lucide-react';

export default function PaymentMethod() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
            </h2>

            {/* Payment Options */}
            <div className="flex gap-3 mb-6">
                {/* Credit Card - Active */}
                <div className="flex items-center gap-2 px-4 py-3 border-2 border-blue-600 bg-blue-50 text-blue-700 rounded-lg cursor-pointer flex-1 justify-center transition-colors">
                    <CreditCard width={20} height={20} />
                    <span className="font-medium text-sm">Credit Card</span>
                </div>

                {/* Bank Transfer */}
                <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg cursor-pointer flex-1 justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <Landmark width={20} height={20} />
                    <span className="font-medium text-sm">Bank Transfer</span>
                </div>

                {/* PayPal */}
                <div className="flex items-center justify-center px-4 py-3 border border-gray-300 bg-white rounded-lg cursor-pointer flex-1 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <img
                        src="https://www.paypalobjects.com/images/shared/paypal-logo-129x32.svg"
                        alt="PayPal"
                        height={20}
                        className="h-5"
                    />
                </div>
            </div>

            {/* Payment Form */}
            <form className="space-y-4">
                {/* Name on Card */}
                <div className="space-y-1.5">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                        Name on Card
                    </label>
                    <input
                        type="text"
                        id="cardName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        placeholder="Sarthak Gupta"
                    />
                </div>

                {/* Card Number */}
                <div className="space-y-1.5">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        placeholder="1234 5678 9012 3456"
                    />
                </div>

                {/* Expiry & CVC Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            id="expiry"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                            placeholder="MM / YY"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                            CVC
                        </label>
                        <input
                            type="text"
                            id="cvc"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                            placeholder="123"
                        />
                    </div>
                </div>

                {/* Security Note */}
                <p className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                    <ShieldCheck width={16} height={16} className="text-green-600" />
                    <span>All transactions are secure and encrypted.</span>
                </p>
            </form>
        </div>
    );
}