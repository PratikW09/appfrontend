import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Reducer/authReducer.js'

export const store = configureStore({
  reducer: {
    auth:authReducer,
  },
})