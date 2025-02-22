import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { deletePostThunk, selectPostById, selectPostsDeleteStatus, selectPostsError } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import PostAuthor from "../components/PostAuthor";
import { MdDelete, MdEdit, MdError } from "react-icons/md";
import { toast } from "react-toastify";
import { IoIosAlert } from "react-icons/io";
import PostDate from "../components/PostDate";
import { useState } from "react";
import { deletePost, selectPostById, selectPostsError, selectPostsStatus } from "../features/posts/postsSlice";


const Post = () => {


   // rrd
   const navigate = useNavigate();
   const { postId } = useParams();


   // Redux
   const dispatch = useDispatch();
   const post = useSelector( state => selectPostById(state, postId) );
   const postsStatus = useSelector(selectPostsStatus);
   const postsError = useSelector(selectPostsError);

   const isLoadingPost = postsStatus.fetchPosts === 'loading';
   const isSuccessPost = postsStatus.fetchPosts === 'completed';
   const isErrorPost = postsStatus.fetchPosts === 'failed';

   const isLoadingDeletePost = postsStatus.deletePost === 'loading';
   const isSuccessDeletePost = postsStatus.deletePost === 'completed';
   const isErrorDeletePost = postsStatus.deletePost === 'failed';


   // callbacks
   const handleDeletePost = async () => {
      try {
         await dispatch(
            deletePost(postId)
         );
         navigate("/");
      } catch (error) {
         toast.error(error.message);
         console.warn(error.message);
      }
   }


   if (!isLoadingPost && !post) {
      return (
         <div className="container p-4">
            <div className="alert alert-secondary">
               <p>
                  <span className="icon me-2" style={{ verticalAlign: 'bottom' }}>
                     <IoIosAlert />
                  </span>
                  <span className="h5" >
                     Not Found the Post
                  </span>
               </p>
            </div>
         </div>
      )
   }


   let postContent;

   if (isLoadingPost) {
      postContent = <p>Loading post...</p>;
   } else if (isSuccessPost) {
      postContent = (
         <>
         <div className="d-flex align-items-center">
            <div className="d-flex gap-4 align-items-center">
               <h2 className="flex-grow-1">
                  {
                     post.title
                  }
               </h2>
               <div className="d-flex gap-3" >
                  <PostAuthor userId={post.user} />
                  <span className="text-secondary">
                     &#x2022;
                  </span>
                  <PostDate timeStampISO={post.date} />
               </div>
            </div>
            <div className="flex-grow-1">
               <div className="d-flex gap-2 justify-content-end" >
                  <Link to={`/edit-post/${postId}`} className="btn btn-outline-primary" >
                     <span>
                        Edit
                     </span>
                     <span className="icon ms-2">
                        <MdEdit />
                     </span>
                  </Link>
                  <button onClick={handleDeletePost} type="button" disabled={isLoadingDeletePost} className="btn btn-outline-danger" >
                     {
                        (isLoadingDeletePost) ? (
                           "Deleting..."
                        ) : (
                           ""
                        )
                     }
                     <span className="icon">
                        <MdDelete />
                     </span>
                  </button>
               </div>
            </div>
         </div>
         <hr />
         <p>
            {
               post.content
            }
         </p>
         </>
      );
   } else if (isErrorPost) {
      let postErrorMessage;
      if (postsError.status === 404) {
         postErrorMessage = "Eror Fetching Post! - Not Found";
      } else {
         postErrorMessage = "Eror Fetching Post!";
      }

      postContent = (
         <p className="text-danger">
            <span className="icon me-2" style={{ verticalAlign: "bottom" }}>
               <MdError />
            </span>
            <span>
               {
                  postErrorMessage
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
            postContent
         }
      </section>
   );
}
 
export default Post;