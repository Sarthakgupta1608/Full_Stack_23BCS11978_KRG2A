// src/pages/dashboard/SellerProductsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/dashboard/ProductForm';

const API_URL = 'http://localhost:8080/api/products';

export default function SellerProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const { token } = useAuth();

    const getAuthHeaders = () => ({
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/seller`, getAuthHeaders());
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products. Please try again.');
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (token) {
            fetchProducts();
        }
    }, [token]);

    const handleSaveProduct = (savedProduct, isEdit) => {
        if (isEdit) {
            setProducts(prev =>
                prev.map(p => (p.productId === savedProduct.productId ? savedProduct : p))
            );
        } else {
            setProducts(prev => [...prev, savedProduct]);
        }
    };

    const openCreateModal = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${API_URL}/${productId}`, getAuthHeaders());
                setProducts(prev => prev.filter(p => p.productId !== productId));
            } catch (err) {
                setError('Failed to delete product.');
                console.error(err);
            }
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
                        onClick={openCreateModal}
                    >
                        <Plus width={16} height={16} />
                        <span>Add New Product</span>
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="relative">
                        <Search width={18} height={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-600">Loading...</td>
                                </tr>
                            ) : products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.productId} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                            product.stockQuantity > 0
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stockQuantity > 0 ? 'Active' : 'Out of Stock'}
                        </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    {product.imageUrl ? (
                                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package width={20} height={20} className="text-gray-400" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {product.stockQuantity > 0 ? (
                                                `${product.stockQuantity} units`
                                            ) : (
                                                <span className="text-red-600 font-medium">0 units</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{product.price.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                    aria-label="Edit"
                                                    onClick={() => openEditModal(product)}
                                                >
                                                    <Edit width={16} height={16} />
                                                </button>
                                                <button
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    aria-label="Delete"
                                                    onClick={() => handleDeleteProduct(product.productId)}
                                                >
                                                    <Trash2 width={16} height={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-600">You haven't added any products yet.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ProductForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productToEdit={productToEdit}
                onSave={handleSaveProduct}
            />
        </>
    );
}