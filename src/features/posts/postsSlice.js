import { createAsyncThunk, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { addPostServer, deletePostServer, getPostServer, getPostsServer, updatePostServer } from "../../services/postsServices";

const initialState = {
   posts: [],
   status: {
      fetch: "idle",
      add: "idle",
      delete: "idle",
      edit: "idle",
   },
   error: null,
}

const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      updateStatus: (state, action) => {
         const { operation, status } = action.payload;
         state.status[operation] = status;
      },
      addError: (state, action) => {
         console.log(action.error, action.payload);
         state.error = action.payload;
      },
      clearError: (state, action) => {
         state.error = null;
      },
      // loadPosts: (state, action) => {
      //    state.posts = action.payload;
      // },
      // addPost: (state, action) => {
      //    state.posts.push(action.payload);
      // },
      // deletePost: (state, action) => {
      //    const { postId } = action.payload;
      //    state.posts = state.posts.filter(post => post.id !== postId);
      // },
      // editPost: (state, action) => {
      //    const { id, title, content } = action.payload;  // new post-object
      //    const existingPost = state.posts.find(post => post.id === id);
      //    existingPost.title = title;
      //    existingPost.content = content;
      // },
   },
   extraReducers: (builder) => {
      builder
      .addCase( fetchPostsThunk.pending, (state, action) => {
         
      } )
      .addCase( fetchPostsThunk.fulfilled, (state, action) => {

      } )
      .addCase( fetchPostsThunk.rejected, (state, action) => {

      } )
   },
});


// AsyncThunks (pending/fulfilled/rejected)
// + fetch
export const fetchPostsThunk = createAsyncThunk( "posts/fetchPosts", async () => {
   const response = await getPostServer();
   return response.data;
} );


// + add
export const addPostThunk = createAsyncThunk( "posts/addPost", async (post) => {
   const response = await addPostServer(post);
   return response.data;
} );


// + delete
export const deletePostThunk = createAsyncThunk( "posts/deletePost", async (postId) => {
   await deletePostServer(postId);
   return postId;
} );


// + edit
export const editPostThunk = createAsyncThunk( "posts/editPost", async (post) => {
   const response = await updatePostServer(post, post.id);
   return response.data;
} )



// Selectors
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);
export const selectPostsFetchStatus = (state) => state.posts.status.fetch;
export const selectPostsAddStatus = (state) => state.posts.status.add;
export const selectPostsDeleteStatus = (state) => state.posts.status.delete;
export const selectPostsEditStatus = (state) => state.posts.status.edit;
export const selectPostsError = (state) => state.posts.error;
// + Memoized
export const selectUserPosts = createSelector(  // args: state, userId
   selectAllPosts,
   (state, userId) => userId,
   (allPosts, userId) => {
      return allPosts.filter(post => post.user === userId)
   }
);



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