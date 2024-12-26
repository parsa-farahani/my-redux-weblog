import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { editPostThunk, selectPostById, selectPostsEditStatus } from "../features/posts/postsSlice";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useGetPostQuery } from "../api/apiSlice";

const EditPost = () => {

   // rrd
   const { postId } = useParams();
   const navigate = useNavigate();

   // Redux
   // const post = useSelector(state => selectPostById(state, postId));
   // const editPostStatus = useSelector(selectPostsEditStatus);
   // const dispatch = useDispatch();


   // RTK-Query
   const {
      data: post,
      isSuccess,
      isError,
      error,
   } = useGetPostQuery(postId);

   
   // states
   const [ title, setTitle ] = useState(post.title);
   const [ content, setContent ] = useState(post.content);
   const [ userId, setUserId ] = useState(null);




   // callbacks
   const handleTitleChange = (e) => {
      setTitle(e.target.value);
   }

   const handleContentChange = (e) => {
      setContent(e.target.value);
   }

   const handleUserIdChange = (e) => {
      setUserId(e.target.value);
   }


   const canSave = title && content;

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (canSave) {
         try {
            // await dispatch(
            //    editPostThunk({
            //       id: postId,
            //       date: post.date,
            //       title,
            //       content,
            //       user: post.user,
            //    })
            // );
            navigate(`/posts/${postId}`);
         } catch (error) {
            toast.error(error.message);
            console.warn(error.message);
         }
      }
   }

   return (
      <section className="container">
         <h2>
            Edit Post
         </h2>
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
                  spellCheck={false}
                  placeholder="my post content..."
                  className="form-control"
               />
            </div>
            <div className="mt-5">
               {/* <button type="submit" disabled={!canSave || editPostStatus === 'pending'} className="btn btn-primary">
                  <span className="icon me-2">
                     <FaCheck />
                  </span>
                  <span>
                     {
                        (editPostStatus === 'pending') ? (
                           "Saving..."
                        ) : (
                           "Save the Post"
                        )
                     }
                  </span>
               </button> */}
            </div>
         </form>
      </section>
   );
}
 
export default EditPost;