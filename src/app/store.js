import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/usersSlice';
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


export default store;