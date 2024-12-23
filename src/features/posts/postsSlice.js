import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { addPostServer, deletePostServer, getPostServer, getPostsServer, updatePostServer } from "../../services/postsServices";

// const postsAdapter = createEntityAdapter({
//    sortComparer: (post1, post2) => post
// })

const initialState = {
   posts: [],
   status: {
      fetchPosts: "idle",
      addPost: "idle",
      deletePost: "idle",
      editPost: "idle",
   },
   error: null,
}

const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
      .addCase( fetchPostsThunk.fulfilled, (state, action) => {
         state.posts = action.payload;
         state.status.fetchPosts = "completed";
      } )
      .addCase( addPostThunk.fulfilled, (state, action) => {
         state.posts.push(action.payload);
         state.status.addPost = "completed";
      } )
      .addCase( editPostThunk.fulfilled, (state, action) => {
         const { id, title, content } = action.payload;
         const existingPost = state.posts.find(post => post.id === id);
         existingPost.title = title;
         existingPost.content = content;
         state.status.editPost = "completed";
      } )
      .addCase( deletePostThunk.fulfilled, (state, action) => {
         const postId = action.payload;
         console.log(postId);
         state.posts = state.posts.filter(post => post.id !== postId);
         state.status.deletePost = "completed";
      } )
      .addMatcher(  // handles 'pending' status
         action => {
            return action.type.endsWith('/pending') && ['fetchPosts', 'addPost', 'editPost', 'deletePost'].includes(action.type.split('/')[1]);
         },
         (state, action) => {
            const operation = action.type.split("/")[1];
            state.status[operation] = "pending";
         }
      )
      .addMatcher(  // handles 'rejected' status -> adds 'action.error.message' to 'state.error'
         action => {
            return action.type.endsWith('/rejected') && ['fetchPosts', 'addPost', 'editPost', 'deletePost'].includes(action.type.split('/')[1]);
         },
         (state, action) => {
            console.log(action.type);
            const operation = action.split("/")[1];
            state.status[operation] = "failed";
            state.error = action.error.message;
         }
      )
   },
});


// AsyncThunks (pending/fulfilled/rejected)
// + fetch
export const fetchPostsThunk = createAsyncThunk( "posts/fetchPosts", async () => {
   const response = await getPostsServer();
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
export const selectPostsFetchStatus = (state) => state.posts.status.fetchPosts;
export const selectPostsAddStatus = (state) => state.posts.status.addPost;
export const selectPostsDeleteStatus = (state) => state.posts.status.deletePost;
export const selectPostsEditStatus = (state) => state.posts.status.editPost;
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