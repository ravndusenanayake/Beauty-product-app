import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Simple check - in a real app, you might use context or state management
    const isAuthenticated = !!token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                            GlowStore
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md font-medium transition-colors">
                            Home
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/admin" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md font-medium transition-colors">
                                    Admin
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors shadow-lg shadow-pink-500/30"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md font-medium transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
