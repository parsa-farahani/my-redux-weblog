import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { addPostServer, deletePostServer, getPostServer, getPostsServer, updatePostServer } from "../../services/postsServices";
import apiSlice from "../../api/apiSlice";


const postsSlice = createSlice({
   name: "posts",
   initialState: {
      status: {
         fetchPosts: "idle",  // handles the status for 'apiSlice.endpoints.getPosts.initiate()'
         error: null,
      }
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
      .addMatcher(
         apiSlice.endpoints.getPosts.matchPending,
         (state, action) => {
            state.status.fetchPosts = "pending";
         }
      )
      .addMatcher(
         apiSlice.endpoints.getPosts.matchFulfilled,
         (state, action) => {
            state.status.fetchPosts = "completed";
         }
      )
      .addMatcher(
         apiSlice.endpoints.getPosts.matchRejected,
         (state, action) => {
            state.status.fetchPosts = "failed";
            state.error = action.error
         }
      )
   },
});




// Selectors
const selectPostsResult = apiSlice.endpoints.getPosts.select();

export const selectAllPosts = createSelector(  // state
   selectPostsResult,
   (postsResult) => postsResult.data ?? []
);

export const selectPostById = createSelector(  // state, postId
   selectAllPosts,
   (state, postId) => postId,
   (allPosts, postId) => allPosts.find(post => post.id === postId)
);


export const selectPostsFetchStatus = (state) => state.posts.status.fetchPosts;
export const selectPostsError = (state) => state.posts.error;




// Actions
export const {
   loadPosts,
   addPost,
   deletePost,
   editPost,
   updateStatus,
   addError,
   clearError,
} = postsSlice.actions;

export default postsSlice.reducer;