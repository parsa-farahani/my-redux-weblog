import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const apiSlice = createApi({
   reducerPath: "api",  // the path to hold our 'cahced-data' (state.api)
   baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:9999' } ),
   endpoints: (builder) => ({  //  GET: query , POST/PUT/DELETE: mutation
      getPosts: builder.query({
         query: () => "/posts",
      }),
      getPost: builder.query({
         query: (postId) => `/posts/${postId}`,
      }),
      
   })
});



export const {
   useGetPostsQuery,
   useGetPostQuery,
} = apiSlice;
