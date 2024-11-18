// client/src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        loginSuccess: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.token = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        },
        authError: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        }
    }
});

export const { setUser, loginSuccess, logout, authError } = authSlice.actions;
export default authSlice.reducer;