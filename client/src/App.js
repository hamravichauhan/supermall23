// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Dashboard from './components/dashboard/Dashboard.js';
import PrivateRoute from './components/routing/PrivateRoute.js';
import ShopList from './components/shops/ShopList.js';
import ShopDetail from './components/shops/ShopDetail.js';
import ProductList from './components/products/ProductList.js';
import ProductDetail from './components/products/ProductDetail.js';
import ProductCompare from './components/products/ProductCompare.js';
import OfferList from './components/offers/OfferList.js';
import ManageShops from '../src/components/dashboard/ManageShops.js'; // Import ShopsManager component
import ManageProducts from '../src/components/dashboard/ManageProducts.js'; // Import ProductsManager component
import ManageOffers from '../src/components/dashboard/ManageOffers.js'; // Import OffersManager component
import Profile from '../src/components/dashboard/ManageProfile.js'; // Import Profile component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shops" element={<ShopList />} />
            <Route path="/shops/:id" element={<ShopDetail />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/compare" element={<ProductCompare />} />
            <Route path="/offers" element={<OfferList />} />
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/dashboard/shops" element={<ManageShops />} />
            <Route path="/dashboard/products" element={<ManageProducts />} />
            <Route path="/dashboard/offers" element={<ManageOffers />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
