// client/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shopReducer from './slices/shopSlice';
import productReducer from './slices/productSlice';
import offerReducer from './slices/offerSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        shops: shopReducer,
        products: productReducer,
        offers: offerReducer,
        categories: categoryReducer
    }
});

