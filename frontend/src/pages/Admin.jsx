import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productId: '',
        name: '',
        description: '',
        price: '',
        labelledPrice: '',
        imageUrl: '', // Simple input for one image URL for now
        isAvailable: true
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products", error);
            if (error.response && error.response.status === 403) {
                navigate('/login'); // Redirect if not admin/logged in
            }
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                labelledPrice: Number(formData.labelledPrice),
                images: formData.imageUrl ? [formData.imageUrl] : [],
                altNames: []
            };

            // Remove helper field
            delete productData.imageUrl;

            await api.post('/products', productData);
            setMessage({ type: 'success', text: 'Product added successfully!' });
            fetchProducts();
            setFormData({
                productId: '',
                name: '',
                description: '',
                price: '',
                labelledPrice: '',
                imageUrl: '',
                isAvailable: true
            });
        } catch (error) {
            console.error("Error adding product", error);
            setMessage({ type: 'error', text: 'Failed to add product' });
        }
    };

    const handleDelete = (productId) => {
        setProducts(products.filter(p => p.productId !== productId));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {/* Add Product Form */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-10 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
                    {message && (
                        <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                            <input name="productId" value={formData.productId} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" placeholder="e.g. P001" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" placeholder="Product Name" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none h-24" placeholder="Product Description"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input name="price" type="number" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Labelled Price</label>
                            <input name="labelledPrice" type="number" value={formData.labelledPrice} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" placeholder="0.00" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" placeholder="https://example.com/image.jpg" />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={formData.isAvailable}
                                onChange={handleChange}
                                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Is Available
                            </label>
                        </div>

                        <div className="md:col-span-2">
                            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>

                {/* Product List */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product} isAdmin={true} onDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;
