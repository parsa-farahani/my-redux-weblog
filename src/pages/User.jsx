import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserPosts, useGetPostsQuery } from "../features/posts/postsSlice";
import { useGetUserQuery } from "../features/users/usersSlice";
import { MdError } from "react-icons/md";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



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
      refetch: refetchUser
   } = useGetUserQuery(userId);


   const userPosts = useSelector(state => selectUserPosts(state, userId));



   // callbacks
   const handleRefetchUser = async () => {
      try {
         await refetchUser().unwrap()
      } catch (error) {
         toast.error("Error Fetch User - Status: " + error?.status);
         console.warn(error);
      }
   }



   if (!user && !isLoadingUser && !isFetchingUser) {
      return (
         <section className="container">
            <p>
               Not Found the User - Try again
            </p>
            <button onClick={handleRefetchUser} type="button" className="btn btn-outline-light">
               Try again
            </button>
         </section>
      )
   }


   let userContent;

   if (isLoadingUser || isFetchingUser) {
      userContent = (
         <p className="h4 d-flex align-items-center justify-content-center">
            <span>
               Loading User...
            </span>
            {" "}
            <span className="loader" style={{ width: "20px", height: "20px" }}></span>
         </p>
      );

   } else if (isSuccessUser) {
      userContent = (
         <>
         
            <h2>
               {
                  user && user.fullname
               }
            </h2>
            <hr />
            <div>
               <h3 className="h5">
                  Posts
               </h3>
               <div>
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
               </div>
            </div>
         </>
      );
   } else if (isErrorUser) {
      let errorMessage;
      if (userError.status === 404) {
         errorMessage = 'Error Fetching User - Not Found';
      } else {
         errorMessage = 'Error Fetching User';
      }

      userContent = (
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
         {
            userContent
         }
      </section>
   );
}
 
export default User;