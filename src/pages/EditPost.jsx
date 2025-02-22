import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, selectPostById, selectPostsError, selectPostsStatus } from "../features/posts/postsSlice";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";


const EditPost = () => {
      
   // states
   const [ title, setTitle ] = useState("");
   const [ content, setContent ] = useState("");


   // rrd
   const { postId } = useParams();
   const navigate = useNavigate();

   // Redux
   const dispatch = useDispatch();
   const post = useSelector(state => selectPostById(state, postId));
   const postsError = useSelector(selectPostsError);
   const postsStatus = useSelector(selectPostsStatus);
   const isLoadingPost = postsStatus.fetchPosts === 'loading';
   const isSuccessPost = postsStatus.fetchPosts === 'completed';
   const isErrorPost = postsStatus.fetchPosts === 'failed';

   const isLoadingEditPost = postsStatus.editPost === 'loading';
   const isSuccessEditPost = postsStatus.editPost === 'completed';
   const isErrorEditPost = postsStatus.editPost === 'failed';


   useEffect(() => {
      if (isSuccessPost && post) {
         setTitle(post.title);
         setContent(post.content);
      }
   }, [isSuccessPost, post]);



   // callbacks
   const handleTitleChange = (e) => {
      setTitle(e.target.value);
   }

   const handleContentChange = (e) => {
      setContent(e.target.value);
   }


   const canSave = title && content && !isLoadingPost && !isLoadingEditPost;

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (canSave) {
         try {
            await dispatch(
               editPost(
                  {
                     id: postId,
                     date: post.date,
                     title,
                     content,
                     user: post.user,
                  }
               )
            );
            navigate(`/posts/${postId}`);
         } catch (error) {
            toast.error(error.message);
            console.warn(error);
         }
      }
   }

   return (
      <section className="container">
         <div className="d-flex align-items-center gap-4">
            <h2>
               Edit Post
            </h2>
            {
               (isLoadingPost) && (
                  <p className="h6 d-flex align-items-center justify-content-center">
                     <span className="text-secondary">
                        Loading...
                     </span>
                     {" "}
                     <span className="loader" style={{ width: "15px", height: "15px" }}></span>
                  </p>
               )
            }
         </div>
         <hr />
         <form onSubmit={handleSubmit} className="">
            <div className="mb-3">
               <label htmlFor="post-title" className="form-label h4">
                  Title
               </label>
               <input
                  type="text"
                  id="post-title"
                  name="post-title"
                  value={title}
                  onChange={handleTitleChange}
                  disabled={isLoadingPost}
                  spellCheck={false}
                  placeholder="my post title..."
                  className="form-control"
               />
            </div>
            <div className="mb-3">
               <label htmlFor="post-content" className="form-label h4">
                  Content
               </label>
               <input
                  type="text"
                  id="post-content"
                  name="post-content"
                  value={content}
                  onChange={handleContentChange}
                  disabled={isLoadingPost}
                  spellCheck={false}
                  placeholder="my post content..."
                  className="form-control"
               />
            </div>
            <div className="mt-5">
               <button type="submit" disabled={!canSave || isLoadingEditPost} className="btn btn-primary">
                  <span className="icon me-2">
                     <FaCheck />
                  </span>
                  <span>
                     {
                        (isLoadingEditPost) ? (
                           "Saving..."
                        ) : (
                           "Save the Post"
                        )
                     }
                  </span>
               </button>
            </div>
         </form>
      </section>
   );
}
 
export default EditPost;