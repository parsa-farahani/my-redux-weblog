import { produce } from "immer";
import { addPostServer, deletePostServer, getPostsServer, updatePostServer } from "../../services/postsServices";
import { createSelector } from "reselect";

const INITIAL_STATE = {
   posts: [],
   status: {  // 'idle, loading, completed, failed
      fetchPosts: "idle",
      addPost: "idle",
      deletePost: "idle",
      editPost: "idle",
   },
   error: null,
};

export const postsReducer = produce((state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "posts/postsOperationLoading": {  // payload: oprationName(fetchPosts, addPost, ...)
         const operationName = action.payload;
         state.status[operationName] = "loading";
         break;
      }
      case "posts/postsOperationFailed": {  // action:  payload: oprationName , error: Error
         const operationName = action.payload;
         const error = action.error;
         state.status[operationName] = "failed";
         state.error = error;
         break;
      }
      case "posts/postsLoaded": {
         state.posts = action.payload;
         state.status.fetchPosts = "completed";
         break;
      }
      case "posts/postAdded": {
         state.posts.push(action.payload);
         state.status.addPost = "completed";
         break;
      }
      case "posts/postEdited": {  // payload:  { postId, title, content }
         const { id, title, content } = action.payload;
         const existingPost = state.posts.find(post => post.id === id);
         existingPost.title = title;
         existingPost.content = content;
         state.status.editPost = "completed";
         break;
      }
      case "posts/postDeleted": {  // payload:  postId
         const postId = action.payload;
         state.posts = state.posts.filter(post => post.id !== postId);
         state.status.deletePost = "completed";
         break;
      }
      default:
         return state;
   }
});


// Action-Creators
export const postsOperationLoading = (operationName) => ({
   type: "posts/postsOperationLoading",
   payload: operationName,
});

export const postsOperationFailed = (operationName, error) => ({
   type: "posts/postsOperationFailed",
   payload: operationName,
   error,
});

export const postsLoaded = (postsData) => ({
   type: "posts/postsLoaded",
   payload: postsData,
});

export const postAdded = (post) => ({
   type: "posts/postAdded",
   payload: post,
});

export const postEdited = (post) => ({
   type: "posts/postEdited",
   payload: post,
});

export const postDeleted = (postId) => ({
   type: "posts/postDeleted",
   payload: postId,
});

// Thunks
export const fetchPosts = () => {
   return async (dispatch, reducer) => {
      try {
         dispatch(postsOperationLoading('fetchPosts'));
         const response = await getPostsServer();
         dispatch(postsLoaded(response.data));
      } catch (error) {
         console.error(error);
         dispatch(postsOperationFailed('fetchPosts', error.message ?? error.status ?? error.toString()));
      }
   };
};

export const addNewPost = (post) => {
   return async (dispatch, reducer) => {
      try {
         dispatch(postsOperationLoading('addPost'));
         const response = await addPostServer(post);
         dispatch(postAdded(response.data));
      } catch (error) {
         console.error(error);
         dispatch(postsOperationFailed('addPost', error.message ?? error.status ?? error.toString()));
      }
   };
};

export const editPost = (post) => {
   return async (dispatch, reducer) => {
      try {
         dispatch(postsOperationLoading('editPost'));
         const response = await updatePostServer(post, post.id);
         dispatch(postEdited(response.data));
      } catch (error) {
         console.error(error);
         dispatch(postsOperationFailed('editPost', error.message ?? error.status ?? error.toString()));
      }
   };
};

export const deletePost = (postId) => {
   return async (dispatch, reducer) => {
      try {
         dispatch(postsOperationLoading('deletePost'));
         const response = await deletePostServer(postId);
         dispatch(postDeleted(postId));
      } catch (error) {
         console.error(error);
         dispatch(postsOperationFailed('deletePost', error.message ?? error.status ?? error.toString()));
      }
   };
};


// Selectros
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;


export const selectUserPosts = createSelector(  // args: state, userId
   selectAllPosts,
   (_unused, userId) => userId,
   (allPosts, userId) => allPosts.filter(post => post.user === userId) 
);
