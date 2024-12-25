import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { addPostServer, deletePostServer, getPostServer, getPostsServer, updatePostServer } from "../../services/postsServices";

// const postsAdapter = createEntityAdapter({
//    sortComparer: (post1, post2) => post2.date.localeCompare(post1.date),
// });

// const initialState = postsAdapter.getInitialState({
//    status: {
//       fetchPosts: "idle",
//       addPost: "idle",
//       deletePost: "idle",
//       editPost: "idle",
//    },
//    error: null,
// });
// { ids: [postId, ...], entities: { postId: post, ... }, status, error }



const postsSlice = createSlice({
   name: "posts",
   initialState: {},
   reducers: {},
   extraReducers: (builder) => {
      // builder
      // .addCase( fetchPostsThunk.fulfilled, (state, action) => {
      //    postsAdapter.upsertMany(state, action.payload);   // initializes the 'Adapter' with fetched-data
      //    state.status.fetchPosts = "completed";
      // } )
      // .addCase( addPostThunk.fulfilled, (state, action) => {
      //    postsAdapter.addOne(state, action.payload);
      //    state.status.addPost = "completed";
      // } )
      // .addCase( editPostThunk.fulfilled, (state, action) => {
      //    const { id, title, content } = action.payload;
      //    // const existingPost = state.entities[id];
      //    // existingPost.title = title;
      //    // existingPost.content = content;
      //    postsAdapter.updateOne( state, {
      //       id: id,
      //       changes: {
      //          title,
      //          content,
      //       }
      //    } );
      //    state.status.editPost = "completed";
      // } )
      // .addCase( deletePostThunk.fulfilled, (state, action) => {
      //    postsAdapter.removeOne(state, action.payload);
      //    state.status.deletePost = "completed";
      // } )
      // .addMatcher(  // handles 'pending' status
      //    action => {
      //       return action.type.endsWith('/pending') && ['fetchPosts', 'addPost', 'editPost', 'deletePost'].includes(action.type.split('/')[1]);
      //    },
      //    (state, action) => {
      //       const operation = action.type.split("/")[1];
      //       state.status[operation] = "pending";
      //    }
      // )
      // .addMatcher(  // handles 'rejected' status -> adds 'action.error.message' to 'state.error'
      //    action => {
      //       return action.type.endsWith('/rejected') && ['fetchPosts', 'addPost', 'editPost', 'deletePost'].includes(action.type.split('/')[1]);
      //    },
      //    (state, action) => {
      //       const operation = action.split("/")[1];
      //       state.status[operation] = "failed";
      //       state.error = action.error.message;
      //    }
      // )
   },
});


// AsyncThunks (pending/fulfilled/rejected)
// + fetch
// export const fetchPostsThunk = createAsyncThunk( "posts/fetchPosts", async () => {
//    const response = await getPostsServer();
//    return response.data;
// } );


// // + add
// export const addPostThunk = createAsyncThunk( "posts/addPost", async (post) => {
//    const response = await addPostServer(post);
//    return response.data;
// } );


// // + delete
// export const deletePostThunk = createAsyncThunk( "posts/deletePost", async (postId) => {
//    await deletePostServer(postId);
//    return postId;
// } );


// // + edit
// export const editPostThunk = createAsyncThunk( "posts/editPost", async (post) => {
//    const response = await updatePostServer(post, post.id);
//    return response.data;
// } )



// Selectors
// + Entity-Adapter Selectors
// export const {
//    selectAll: selectAllPosts,
//    selectById: selectPostById,
// } = postsAdapter.getSelectors( state => state.posts );
// + Normal Selectors
export const selectPostsFetchStatus = (state) => state.posts.status.fetchPosts;
export const selectPostsAddStatus = (state) => state.posts.status.addPost;
export const selectPostsDeleteStatus = (state) => state.posts.status.deletePost;
export const selectPostsEditStatus = (state) => state.posts.status.editPost;
export const selectPostsError = (state) => state.posts.error;
// + Memoized Selectors
// export const selectUserPosts = createSelector(  // args: state, userId
//    selectAllPosts,
//    (state, userId) => userId,
//    (allPosts, userId) => {
//       return allPosts.filter(post => post.user === userId)
//    }
// );



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