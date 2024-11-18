import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    offers: [],
    loading: false,
    error: null,
};

const offerSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        fetchOffersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchOffersSuccess: (state, action) => {
            state.offers = action.payload;
            state.loading = false;
        },
        fetchOffersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchOffersStart, fetchOffersSuccess, fetchOffersFailure } = offerSlice.actions;
export default offerSlice.reducer;
