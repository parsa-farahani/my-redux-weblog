import { createBrowserRouter } from "react-router-dom";
// components
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import Users from "../pages/Users";
import Home from "../pages/Home";
import User from "../pages/User";
import Post from "../pages/Post";

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
            path: "/posts/:postId",
            element: <Post />
         },
         {
            path: "/users",
            element: <Users />
         },
         {
            path: "/users/:userId",
            element: <User />
         },
      ]
   },
   {
      path: "*",
      element: <h2 className="text-center" >404 - Not Found the Page</h2>
   },
])