import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action) => {
            state.products = action.payload;
            state.loading = false;
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchProductById: (state, action) => {
            const product = state.products.find(product => product._id === action.payload._id);
            if (product) {
                state.product = product;
            }
        }
    }
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, fetchProductById } = productSlice.actions;
export default productSlice.reducer;
