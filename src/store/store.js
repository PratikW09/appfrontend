import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Reducer/authReducer.js'
import blogReducer from '../Reducer/blogReducer.js';
import likeReducer from '../Reducer/likeReducer.js';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    blog:blogReducer,
    like:likeReducer,
  },
})