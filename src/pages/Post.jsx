import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { deletePostThunk, selectPostById, selectPostsDeleteStatus, selectPostsError } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import PostAuthor from "../components/PostAuthor";
import { MdDelete, MdEdit, MdError } from "react-icons/md";
import { toast } from "react-toastify";
import { IoIosAlert } from "react-icons/io";
import PostDate from "../components/PostDate";
import { useDeletePostMutation, useGetPostQuery } from "../features/posts/postsSlice";
import { useState } from "react";


const Post = () => {

   // states
   const [deletePostStatus, setDeletePostStatus] = useState("idle");

   // rrd
   const navigate = useNavigate();
   const { postId } = useParams();

   // RTK-Query
   const {
      data: post,
      isFetching: isFetchingPost,
      isLoading: isLoadingPost,
      isSuccess: isSuccessPost,
      isError: isErrorPost,
      error: postError,
   } = useGetPostQuery(postId);

   const [
      deletePostAPI,
      {
         isLoading: isLoadingDeletePost,
         isError: isErrorDeletePost,
         error: deletePostError,
      }
   ] = useDeletePostMutation();
   

   // callbacks
   const handleDeletePost = async () => {
      setDeletePostStatus("pending");
      try {
         await deletePostAPI(postId).unwrap();
         navigate("/");
      } catch (error) {
         toast.error(error.message);
         console.warn(error.message);
      } finally {
         setDeletePostStatus("idle");
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

   if (isLoadingPost || isFetchingPost) {
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
                  <button onClick={handleDeletePost} type="button" disabled={deletePostStatus === 'pending'} className="btn btn-outline-danger" >
                     {
                        (deletePostStatus === 'pending') ? (
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
      if (postError.status === 404) {
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