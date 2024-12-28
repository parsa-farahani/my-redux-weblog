import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../features/users/usersSlice";
import { useGetPostsQuery, useGetUserQuery } from "../api/apiSlice";
import { MdError } from "react-icons/md";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
// import { selectUserPosts } from "../features/posts/postsSlice";



const User = () => {

   // rrd
   const { userId } = useParams();

   // RTK-Query
   const {
      data: user,
      isLoading: isLoadingUser,
      isFetching: isFetchingUser,
      isSuccess: isSuccessUser,
      isError: isErrorUser,
      error: userError,
   } = useGetUserQuery(userId);

   console.log(userId, user);


   const selectUserPosts = useMemo(() => {
      return createSelector(  // args:  posts, userId
         (res) => res.data,
         (res, userId) => userId,
         (allPosts, userId) => allPosts?.filter(post => post.user === userId) ?? []
      )
   }, [])

   const { userPosts } = useGetPostsQuery(undefined, {
      selectFromResult: (result) => ({
         ...result,
         userPosts: selectUserPosts(result, userId),   // result: Array of all Posts
      })
   })



   if (!user && !isLoadingUser) {
      return (
         <div className="container">
            <p>
               Not Found the User
            </p>
         </div>
      )
   }


   let userPostsContent;

   if (isLoadingUser || isFetchingUser) {
      userPostsContent = (
         <p className="h4 d-flex align-items-center justify-content-center">
            <span>
               Loading User...
            </span>
            {" "}
            <span className="loader" style={{ width: "40px", height: "40px" }}></span>
         </p>
      );

   } else if (isSuccessUser) {
      userPostsContent = (
         <>
            {
               (userPosts && userPosts.length > 0) ? (
                  <ul>
                     {
                        userPosts.map(post => (
                           <li key={post.id}>
                              <Link to={`/posts/${post.id}`} >
                                 {
                                    post.title
                                 }
                              </Link>
                           </li>
                        ))
                     }
                  </ul>
               ) : (
                  <p>
                     This user hasn not any post yet!
                  </p>
               )
            }
         </>
      );
   } else if (isErrorUser) {
      let errorMessage;
      if (userError.status === 404) {
         errorMessage = 'Error Fetching User - Not Found';
      } else {
         errorMessage = 'Error Fetching User';
      }

      userPostsContent = (
         <p className="text-danger">
            <span className="icon me-2" style={{ verticalAlign: "bottom" }}>
               <MdError />
            </span>
            <span>
               {
                  errorMessage
               }
            </span>
            {" | "}
            <span>Please try again</span>
         </p>
      )
   }

   return (
      <section className="container">
         <h2>
            {
               user.fullname
            }
         </h2>
         <hr />
         <div>
            <h3 className="h5">
               Posts
            </h3>
            <div>
               {
                  userPostsContent
               }
            </div>
         </div>
      </section>
   );
}
 
export default User;