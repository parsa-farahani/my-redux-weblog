import { createBrowserRouter } from "react-router-dom";
// components
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import Users from "../pages/Users";
import Home from "../pages/Home";
import User from "../pages/User";
import AddPost from "../pages/AddPost";
import Post from "../pages/Post";
import EditPost from "../pages/EditPost";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      errorElement: <h3 className="text-center" >an Erro occured! please try again later</h3>,
      children: [
         {
            path: "/",
            element: <Home />
         },
         {
            path: "/users",
            element: <Users />
         },
         {
            path: "/users/:userId",
            element: <User />
         },
         {
            path: "/add-post",
            element: <AddPost />
         },
         {
            path: "/posts/:postId",
            element: <Post />
         },
         {
            path: "/edit-post/:postId",
            element: <EditPost />
         },
      ]
   },
   {
      path: "*",
      element: <h2 className="text-center" >404 - Not Found the Page</h2>
   },
])