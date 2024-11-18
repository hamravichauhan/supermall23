// client/src/components/layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <>
      <Link
        to="/dashboard"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Dashboard
      </Link>
      <button
        onClick={onLogout}
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <>
      <Link
        to="/register"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Login
      </Link>
    </>
  );

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              SuperMall
            </Link>
          </div>
          <div className="flex">
            <div className="flex items-center">
              <Link
                to="/shops"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Shops
              </Link>
              <Link
                to="/products"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                to="/offers"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Offers
              </Link>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;