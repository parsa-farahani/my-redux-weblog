import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { selectPostsFetchStatus } from "./features/posts/postsSlice";

const App = () => {

   // states
   // const [isLoadingPosts, setIsLoadingPosts] = useState(false);
   // const [isLoadingUsers, setIsLoadingUsers] = useState(false);

   return (
      <MainLayout >
         <Outlet />
      </MainLayout>
   );
};

export default App;
