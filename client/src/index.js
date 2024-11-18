import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/slices/authSlice';
import shopReducer from './store/slices/shopSlice';
import productReducer from './store/slices/productSlice';
import offerReducer from './store/slices/offerSlice';
import categoryReducer from './store/slices/categorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        shops: shopReducer,
        products: productReducer,
        offers: offerReducer,
        categories: categoryReducer
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
