import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
// components
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPostsStatus } from './features/posts/postsSlice';


function App() {

  // Redux
  const dispatch = useDispatch();
  const postsStatus = useSelector(selectPostsStatus);

  useEffect(() => {

    if (postsStatus === 'completed') return;

    dispatch(
      fetchPosts()
    )

  }, [])



  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App


// Routing Pattern:
/*
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
*/