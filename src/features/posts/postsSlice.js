import { produce } from "immer";
import { getPostsServer } from "../../services/postsServices";


const INITIAL_STATE = {
   posts: [],
   status: "idle",  // "loading", "completed", "failed"
   error: null,
};


export const postsReducer = produce((state = INITIAL_STATE, action) => {

   switch (action.type) {
      case 'posts/postsLoading': {
         state.status = 'loading';
         break;
      }
      case 'posts/postsLoadingFailed': {
         state.status = 'failed';
         state.error = action.error;
         break;
      }
      case 'posts/postsLoaded': {
         state.posts = action.payload;
         state.status = 'completed';
         break;
      }
      default:
         return state;
   }
});

// Action-Creators
export const postsLoading = () => ({
   type: 'posts/postsLoading',
})

export const postsLoadingFailed = (error) => ({
   type: 'posts/postsLoadingFailed',
   error,
})

export const postsLoaded = (postsData) => ({
   type: 'posts/postsLoaded',
   payload: postsData,
})


// thunks
export const fetchPosts = () => {
   return async (dispatch, reducer) => {

      try {
         dispatch(
            postsLoading()
         )
         const response = await getPostsServer();
         dispatch(
            postsLoaded(response.data)
         );
      } catch (error) {
         console.error(error);
         dispatch(
            postsLoadingFailed(error.message)
         )
      }
      
   }
}



// Selectros
export const selectAllPosts = state => state.posts.posts;
export const selectPostsStatus = state => state.posts.status;

