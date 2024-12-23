import { configureStore } from "@reduxjs/toolkit";
import { getUsersServer } from "../services/usersServices";
import { getPostsServer } from "../services/postsServices";
import usersReducer, { loadUsers } from '../features/users/usersSlice';
import postsReducer, { loadPosts } from '../features/posts/postsSlice';


const store = configureStore({
   reducer: {
      users: usersReducer,
      posts: postsReducer,
   },
});

// fetch data
const fetchUsers = async () => {
   try {
      const response = await getUsersServer();
      store.dispatch(
         loadUsers(response.data)
      );
   } catch (error) {
      console.warn("Erro fetching users: ", error);
   }
}

const fetchPosts = async () => {
   try {
      const response = await getPostsServer();
      store.dispatch(
         loadPosts(response.data)
      );
   } catch (error) {
      console.warn("Erro fetching posts: ", error);
   }
}

fetchUsers();
fetchPosts();

export default store;