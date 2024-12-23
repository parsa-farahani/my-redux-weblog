import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { addPostServer, deletePostServer, getPostsServer, updatePostServer } from "../../services/postsServices";

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
      loadPosts: (state, action) => {
         state.posts = action.payload;
      },
      addPost: (state, action) => {
         state.posts.push(action.payload);
      },
      deletePost: (state, action) => {
         const { postId } = action.payload;
         state.posts = state.posts.filter(post => post.id !== postId);
      },
      editPost: (state, action) => {
         const { id, title, content } = action.payload;  // new post-object
         const existingPost = state.posts.find(post => post.id === id);
         existingPost.title = title;
         existingPost.content = content;
      },
   },
   extraReducers: (builder) => {},
});


// Thunks
// + fetch
export const fetchPostsThunk = () => {
   return async (dispatch, getState) => {
      try {
         dispatch( updateStatus({operation: "fetch", status: "pending"}) );
         const response = await getPostsServer();
         dispatch(
            loadPosts(response.data)
         )
         dispatch( updateStatus({operation: "fetch", status: "completed"}) );
         dispatch( clearError() );
      } catch (error) {
         console.warn(error);
         dispatch( updateStatus({operation: "fetch", status: "failed"}) );
         dispatch( addError(error.message) );
      }
   }
}

// + add
export const addPostThunk = (post) => {
   return async (dispatch, getState) => {
      try {
         dispatch( updateStatus({operation: "add", status: "pending"}) );
         const response = await addPostServer(post);
         dispatch(
            addPost(response.data)
         )
         dispatch( updateStatus({operation: "add", status: "completed"}) );
         dispatch( clearError() );
      } catch (error) {
         console.warn(error);
         dispatch( updateStatus({operation: "add", status: "failed"}) );
         dispatch( addError(error.message) );
      }
   }
}

// + delete
export const deletePostThunk = (postId) => {
   return async (dispatch, getState) => {
      try {
         dispatch( updateStatus({operation: "delete", status: "pending"}) );
         await deletePostServer(postId);
         dispatch(
            deletePost( { postId } )
         )
         dispatch( updateStatus({operation: "delete", status: "completed"}) );
         dispatch( clearError() );
      } catch (error) {
         dispatch( updateStatus({operation: "delete", status: "failed"}) );
         dispatch( addError(error.message) );
      }
   }
}

// + edit
export const editPostThunk = (post) => {
   return async (dispatch, getState) => {
      try {
         dispatch( updateStatus({operation: "edit", status: "pending"}) );
         const response = await updatePostServer(post, post.id);
         dispatch(
            editPost(response.data)
         )
         dispatch( updateStatus({operation: "edit", status: "completed"}) );
         dispatch( clearError() );
      } catch (error) {
         console.warn(error);
         dispatch( updateStatus({operation: "edit", status: "failed"}) );
         dispatch( addError(error.message) );
      }
   }
}


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