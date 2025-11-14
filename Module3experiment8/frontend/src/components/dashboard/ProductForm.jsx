// src/components/dashboard/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, UploadCloud } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://localhost:8080/api/products';
const categories = ['Electronics', 'Food', 'Homeware', 'Fashion'];

export default function ProductForm({ isOpen, onClose, productToEdit, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const isEditMode = productToEdit != null;

    useEffect(() => {
        if (isEditMode) {
            setFormData({
                name: productToEdit.name,
                description: productToEdit.description,
                price: productToEdit.price,
                stockQuantity: productToEdit.stockQuantity,
                category: productToEdit.category
            });
            setPreview(productToEdit.imageUrl);
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                stockQuantity: '',
                category: ''
            });
            setPreview(null);
        }
        setSelectedFile(null);
        setError(null);
    }, [productToEdit, isOpen, isEditMode]);

    const getAuthHeaders = () => ({
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stockQuantity: parseInt(formData.stockQuantity, 10)
        };

        if (!productData.category) {
            setError("Please select a category.");
            setLoading(false);
            return;
        }

        try {
            let savedProduct;

            if (isEditMode) {
                const response = await axios.put(
                    `${API_URL}/${productToEdit.productId}`,
                    productData,
                    getAuthHeaders()
                );
                savedProduct = response.data;
            } else {
                const response = await axios.post(API_URL, productData, getAuthHeaders());
                savedProduct = response.data;
            }

            if (selectedFile) {
                const imageFormData = new FormData();
                imageFormData.append('file', selectedFile);
                const imageResponse = await axios.post(
                    `${API_URL}/${savedProduct.productId}/image`,
                    imageFormData,
                    getAuthHeaders()
                );
                savedProduct = imageResponse.data;
            }

            onSave(savedProduct, isEditMode);
            onClose();

        } catch (err) {
            console.error("Failed to save product:", err);
            setError("Failed to save product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEditMode ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X width={20} height={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-5" onSubmit={handleSubmit}>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <div className="flex items-center gap-4">
                            <div className="w-32 h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {preview ? (
                                    <img src={preview} alt="Product preview" className="w-full h-full object-cover" />
                                ) : (
                                    <UploadCloud width={40} height={40} className="text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="file"
                                    className="inline-block px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-pointer transition-colors"
                                >
                                    Choose Image
                                </label>
                                <p className="mt-2 text-xs text-gray-500">
                                    {selectedFile ? selectedFile.name : 'PNG or JPEG (max 5MB)'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Category Selector */}
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none"
                            rows="4"
                            placeholder="Enter product description"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Price & Stock Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input
                                type="number"
                                id="price"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                step="0.01"
                                placeholder="19.99"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input
                                type="number"
                                id="stockQuantity"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                step="1"
                                placeholder="100"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}