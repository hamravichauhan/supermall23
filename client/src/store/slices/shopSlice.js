import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    shops: [],
    loading: false,
    error: null,
};

const shopSlice = createSlice({
    name: 'shops',
    initialState,
    reducers: {
        fetchShopsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchShopsSuccess: (state, action) => {
            state.shops = action.payload;
            state.loading = false;
        },
        fetchShopsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchShopById: (state, action) => {
            const shop = state.shops.find(shop => shop._id === action.payload._id);
            if (shop) {
                state.shop = shop;
            }
        }
    }
});

export const { fetchShopsStart, fetchShopsSuccess, fetchShopsFailure, fetchShopById } = shopSlice.actions;
export default shopSlice.reducer;
