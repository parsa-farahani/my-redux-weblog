import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiSlice = createApi({
   reducerPath: "api",  // the path to hold our 'cahced-data' (state.api)
   baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:9999' } ),
   tagTypes: ["USER_POST", "USER"],
   endpoints: (builder) => ({  //  GET: query , POST/PUT/DELETE: mutation
      // posts-endpoints are injected inside 'postsSlice.js'
      // users-endpoints are injected inside 'usersSlice.js'
   }),
});




export default apiSlice;