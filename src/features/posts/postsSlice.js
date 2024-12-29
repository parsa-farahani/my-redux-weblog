import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { addPostServer, deletePostServer, getPostServer, getPostsServer, updatePostServer } from "../../services/postsServices";
import apiSlice from "../../api/apiSlice";

export const postsAdapter = createEntityAdapter({
   sortComparer: (post1, post2) => post2.date.localeCompare(post1.date),
});

export const initialState = postsAdapter.getInitialState({
   status: {
      fetchPosts: "idle",  // handles the status for 'apiSlice.endpoints.getPosts.initiate()'
      error: null,
   }
});
// { ids: [postId, ...], entities: { postId: post, ... }, status, error }


const extendedApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPosts: builder.query({
         query: () => "/posts",
         providesTags: (result = [], error, arg) => {
            return [
               "USER_POST",
               ...result.ids.map(postId => ({type: "USER_POST", id: postId}))
            ]
         },
         transformResponse: (responseData) => {
            return postsAdapter.setAll( initialState, responseData );
         }
      }),
      getPost: builder.query({
         query: (postId) => `/posts/${postId}`,
         providesTags: (result, error, arg) => [
            { type: "USER_POST", id: arg },
         ]
      }),
      addNewPost: builder.mutation({
         query: (post) => ({
            url: '/posts',
            method: 'POST',
            body: post,
         }),
         invalidatesTags: ["USER_POST"],
      }),
      editPost: builder.mutation({
         query: (post) => ({
            url: `/posts/${post.id}`,
            method: 'PUT',
            body: post,
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "USER_POST", id: arg.id },
         ]
      }),
      deletePost: builder.mutation({
         query: (postId) => ({
            url: `/posts/${postId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ["USER_POST"],
      }),
   })
})



const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
      .addMatcher(
         extendedApiSlice.endpoints.getPosts.matchPending,
         (state, action) => {
            state.status.fetchPosts = "pending";
         }
      )
      .addMatcher(
         extendedApiSlice.endpoints.getPosts.matchFulfilled,
         (state, action) => {
            state.status.fetchPosts = "completed";
         }
      )
      .addMatcher(
         extendedApiSlice.endpoints.getPosts.matchRejected,
         (state, action) => {
            state.status.fetchPosts = "failed";
            state.error = action.error
         }
      )
   },
});




// Selectors
const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
   selectPostsResult,
   (postsResult) => postsResult.data
)

export const {
   selectAll: selectAllPosts,
   selectById: selectPostById,
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState);

// + Memoized
export const selectUserPosts = createSelector(  // args: state, userId
   selectAllPosts,
   (state, userId) => userId,
   (allPosts, userId) => allPosts.filter(post => post.user === userId)
)



export const selectPostsFetchStatus = (state) => state.posts.status.fetchPosts;
export const selectPostsError = (state) => state.posts.error;


// export const selectAllPosts = createSelector(  // state
//    selectPostsResult,
//    (postsResult) => postsResult.data ?? []
// );

// export const selectPostById = createSelector(  // state, postId
//    selectAllPosts,
//    (state, postId) => postId,
//    (allPosts, postId) => allPosts.find(post => post.id === postId)
// );



// apiSlice Hooks
export const {
   useGetPostsQuery,
   useGetPostQuery,
   useAddNewPostMutation,
   useEditPostMutation,
   useDeletePostMutation,
} = extendedApiSlice;

export default postsSlice.reducer;