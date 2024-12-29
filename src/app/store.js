import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { extendedApiSlice } from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import apiSlice from "../api/apiSlice";


const store = configureStore({
   reducer: {
      users: usersReducer,
      posts: postsReducer,
      [apiSlice.reducerPath]: apiSlice.reducer
   },
   middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat( apiSlice.middleware ),
});


// initiate fetching data( RTK-Query )
store.dispatch( extendedApiSlice.endpoints.getUsers.initiate() );
store.dispatch( apiSlice.endpoints.getPosts.initiate() );

export default store;