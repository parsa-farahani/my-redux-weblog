import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// components
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPostsStatus } from "./features/posts/postsSlice";
import NotFound from "./pages/NotFound";
import { fetchUsers, selectUsersStatus } from "./features/users/usersSlice";
import Users from "./pages/Users";
import User from "./pages/User";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";



function App() {

   // Redux
   const dispatch = useDispatch();
   const postsStatus = useSelector(selectPostsStatus);
   const isLoadingPosts = postsStatus.fetchPosts === "loading";
   const isSuccessPosts = postsStatus.fetchPosts === "compelted";

   const usersStatus = useSelector(selectUsersStatus);
   const isSuccessUsers = usersStatus.fetch === 'completed';
   const isLoadingUsers = usersStatus.fetch === 'loading';


   useEffect(() => {
      if (isSuccessUsers) return;

      const fetchUsersFromServer = async () => {

         try {
            await dispatch(
               fetchUsers()
            );
         } catch (error) {
            console.error(error);  
         }
      }

      fetchUsersFromServer();
   }, [dispatch, isSuccessUsers]);


   useEffect(() => {
      if (isSuccessPosts) return;

      const fetchUsersFromServer = async () => {

         try {
            await dispatch(fetchPosts());
         } catch (error) {
            console.error(error);
         }
      }

      fetchUsersFromServer();

   }, [dispatch, isSuccessPosts]);



   return (
      <>
         <Routes>
            <Route
               path="/"
               element={
                  <MainLayout
                     isLoadingPosts={isLoadingPosts}
                     isLoadingUsers={isLoadingUsers}
                  />
               }
            >
               <Route index element={<Home />} />
               <Route path="users" element={<Users />} />
               <Route path="users/:userId" element={<User />} />
               <Route path="posts/:postId" element={<Post />} />
               <Route path="add-post" element={<AddPost />} />
               <Route path="edit-post/:postId" element={<EditPost />} />
            </Route>
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
}

export default App;
