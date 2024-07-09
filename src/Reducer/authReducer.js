import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    checkAuthenticate: (state) => {
      const token = localStorage.getItem('accessToken');
      const isUserValid = localStorage.getItem('isUserValid') === 'true';
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user)

      if (token && isUserValid && user) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },


});

export const { login, logout, register,checkAuthenticate } = authSlice.actions;

export default authSlice.reducer;
