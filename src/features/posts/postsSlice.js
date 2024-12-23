import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
   posts: [],
   status: "idle",
   error: null,
}

const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      loadPosts: (state, action) => {
         state.posts = action.payload;
      }
   },
   extraReducers: (builder) => {},
});

// Selectors
export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);
// + Memoized
export const selectUserPosts = createSelector(
   selectAllPosts,
   (state, userId) => userId,
   (allPosts, userId) => allPosts.filter(post => post.user === userId)
)

// Actions
export const {
   loadPosts,
} = postsSlice.actions;

export default postsSlice.reducer;