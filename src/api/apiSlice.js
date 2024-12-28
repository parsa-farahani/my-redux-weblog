import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
   reducerPath: "api",  // the path to hold our 'cahced-data' (state.api)
   baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:9999' } ),
   tagTypes: ["USER_POST", "USER"],
   endpoints: (builder) => ({  //  GET: query , POST/PUT/DELETE: mutation
      getPosts: builder.query({
         query: () => "/posts",
         providesTags: (result = [], error, arg) => [
            "USER_POST",
            ...result.map(data => ({type: "USER_POST", id: data.id}))
         ]
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
      getUsers: builder.query({
         query: () => '/users',
         providesTags: ["USER"],
      }),
      getUser: builder.query({
         query: (userId) => `/users/${userId}`,
         providesTags: (result, error, arg) => [
            { type: "USER", id: arg },
         ],
      }),
      addNewUser: builder.mutation({
         query: (user) => ({
            url: '/users',
            method: 'POST',
            body: user,
         }),
         invalidatesTags: ["USER"],
      }),
      deleteUser: builder.mutation({
         query: (userId) => ({
            url: `/users/${userId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ["USER"],
      }),
   }),
});



export const {
   useGetPostsQuery,
   useGetPostQuery,
   useAddNewPostMutation,
   useEditPostMutation,
   useDeletePostMutation,
   useGetUsersQuery,
   useGetUserQuery,
   useAddNewUserMutation,
   useDeleteUserMutation,
} = apiSlice;

export default apiSlice;