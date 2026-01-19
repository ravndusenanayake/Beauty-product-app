import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-gradient-to-r from-pink-500 to-violet-600 text-white py-20 px-4 mb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Discover Your Glow</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">
                        Explore our curated collection of premium beauty products designed to verify your natural radiance.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl text-gray-600 font-medium">No products found. check back later!</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
