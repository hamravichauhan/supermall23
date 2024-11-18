import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

const Dashboard = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Welcome to your Dashboard
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Here you can manage your shops, products, and offers.
                </p>
                
                <div className="mt-8 space-y-4">
                    <Link to="/shops" className="block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500">
                        Manage Shops
                    </Link>
                    <Link to="/products" className="block w-full text-center bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-500">
                        Manage Products
                    </Link>
                    <Link to="/offers" className="block w-full text-center bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-500">
                        Manage Offers
                    </Link>
                    <Link to="/profile" className="block w-full text-center bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-gray-500">
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
