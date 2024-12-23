import { configureStore } from "@reduxjs/toolkit";
import { getUsersServer } from "../services/usersServices";
import { getPostsServer } from "../services/postsServices";
import usersReducer, { loadUsers } from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';


const store = configureStore({
   reducer: {
      users: usersReducer,
      posts: postsReducer,
   },
});


export default store;