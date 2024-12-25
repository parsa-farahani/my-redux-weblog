import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk } from "./features/users/usersSlice";
import { toast } from "react-toastify";
import { selectPostsFetchStatus } from "./features/posts/postsSlice";

const App = () => {

   // states
   const [isLoadingPosts, setIsLoadingPosts] = useState(false);
   const [isLoadingUsers, setIsLoadingUsers] = useState(false);

   // Redux
   const postsFetchStatus = useSelector(selectPostsFetchStatus);
   const dispatch = useDispatch();

   // fetch posts
   // useEffect(() => {
   //    let ignore = false

   //    const fetchPosts = async () => {
   //       try {
   //          await dispatch(
   //             fetchPostsThunk()
   //          ).unwrap()
   //       } catch (error) {
   //          toast.error("Error fetch Posts: " + error.message);
   //          console.warn(error);
   //       }
   //    }

   //    if (postsFetchStatus === "idle" && !ignore) {
   //       fetchPosts();
   //    }

   //    return () => {
   //       ignore = true;
   //    }
   // }, [dispatch, postsFetchStatus])


   // fetch users
   useEffect(() => {
      let ignore = false

      const fetchUsers = async () => {
         setIsLoadingUsers(true);
         try {
            await dispatch(fetchUsersThunk());
         } catch (error) {
            toast.error("Failed to fetch users: " + error.message);
            console.warn(error);
         } finally {
            setIsLoadingUsers(false);
         }
      };

      if (!ignore) {
         fetchUsers();
      }

      return () => {
         ignore = true;
      }
   }, [dispatch]);


   return (
      <MainLayout isLoadingUsers={isLoadingUsers} isLoadingPosts={isLoadingPosts} >
         <Outlet />
      </MainLayout>
   );
};

export default App;
