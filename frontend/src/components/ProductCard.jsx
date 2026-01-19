import React from 'react';
import api from '../api/axios';

const ProductCard = ({ product, onDelete, isAdmin }) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${product.productId}`);
                onDelete(product.productId);
            } catch (error) {
                console.error("Failed to delete product", error);
                alert("Failed to delete product");
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {product.images && product.images[0] ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
                {product.isAvailable ? (
                    <div className="absolute top-2 right-2 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                        In Stock
                    </div>
                ) : (
                    <div className="absolute top-2 right-2 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                        Out of Stock
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={product.name}>
                    {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5em]">
                    {product.description}
                </p>

                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-2xl font-bold text-pink-600">${product.price}</span>
                        {product.labelledPrice > product.price && (
                            <span className="ml-2 text-sm text-gray-400 line-through">${product.labelledPrice}</span>
                        )}
                    </div>
                </div>

                {isAdmin && (
                    <button
                        onClick={handleDelete}
                        className="mt-4 w-full bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors border border-red-200"
                    >
                        Delete Product
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
