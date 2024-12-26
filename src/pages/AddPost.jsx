import { FaCheck } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";
import { useState } from "react";
// import { addPostThunk, selectPostsAddStatus } from "../features/posts/postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation, useGetUsersQuery } from "../api/apiSlice";

const AddPost = () => {

   // states
   const [ title, setTitle ] = useState("");
   const [ content, setContent ] = useState("");
   const [ userId, setUserId ] = useState("");

   // rrd
   const navigate = useNavigate();

   // RTK-Query
   const [
      addPostApi,
      {
         isLoading: isLoadingAddPost,
         isSuccess: usSuccessAddPost,
         isError: isErrorAddPost,
         error: addPostError,
      }
   ] = useAddNewPostMutation();

   const {
      data: users = [],
      isLoading: isLoadingUsers,
      isSuccess: isSuccessUsers,
      isError: isErrorUsers,
      error: usersError,
   } = useGetUsersQuery();


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


   const canSave = title && content && userId && !isLoadingUsers && !isLoadingAddPost;

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (canSave) {
         try {
            await addPostApi(
               {
                  id: nanoid(),
                  date: new Date().toISOString(),
                  title,
                  content,
                  user: userId,
               }
            ).unwrap();
            navigate("/");
         } catch (error) {
            toast.error(error.message);
            console.warn(error.message);
         }
      }
   }

   return (
      <section className="container">
         <h2>
            Add Post
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
               <label htmlFor="post-author" className="form-label h4">
                  Author
               </label>
               <select
                  id="post-author"
                  name="post-author"
                  value={userId}
                  onChange={handleUserIdChange}
                  disabled={isLoadingUsers}
                  className="form-select"
               >
                  <option value="">
                     {
                        (isLoadingUsers) ? (
                           "Loading..."
                        ) : (
                           "Select the Author"  
                        )
                     }
                  </option>
                  {
                     users.map(user => (
                        <option key={user.id} value={user.id} >
                           {
                              user.fullname
                           }
                        </option>
                     ))
                  }
               </select>
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
               <button type="submit" disabled={!canSave || isLoadingAddPost} className="btn btn-primary">
                  <span className="icon me-2">
                     <FaCheck />
                  </span>
                  <span>
                     {
                        (isLoadingAddPost) ? (
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
 
export default AddPost;