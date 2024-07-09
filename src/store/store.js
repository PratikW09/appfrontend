import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Reducer/authReducer.js'
import blogReducer from '../Reducer/blogReducer.js';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    blog:blogReducer,
  },
})