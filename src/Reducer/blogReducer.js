import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
  userPosts:[],
};

// Create an async thunk for fetching posts
export const fetchAllPosts = createAsyncThunk('fetchAllPosts', async () => {
  const response = await axios.get('/api/users/getAllPost');
  return response.data;
});

// Create an async thunk for fetching posts
export const fetchAllUserPosts = createAsyncThunk('fetchAllUserPosts', async () => {
    const response = await axios.get('/api/users/getUserPost');
    return response.data;
  });

// Create the blog slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload.posts;
      })
      .addCase(fetchAllUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
