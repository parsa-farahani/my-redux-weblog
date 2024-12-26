import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
   reducerPath: "api",  // the path to hold our 'cahced-data' (state.api)
   baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:9999' } ),
   tagTypes: ["USER_POST"],
   endpoints: (builder) => ({  //  GET: query , POST/PUT/DELETE: mutation
      getPosts: builder.query({
         query: () => "/posts",
         providesTags: ["USER_POST"]
      }),
      getPost: builder.query({
         query: (postId) => `/posts/${postId}`,
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
         })
      }),
      deletePost: builder.mutation({
         query: (postId) => ({
            url: `/posts/${postId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ["USER_POST"],
      }),
      getUsers: builder.query({
         query: () => '/users',
      })
   }),
});



export const {
   useGetPostsQuery,
   useGetPostQuery,
   useAddNewPostMutation,
   useEditPostMutation,
   useDeletePostMutation,
   useGetUsersQuery,
} = apiSlice;

export default apiSlice;