import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePostThunk, selectPostById, selectPostsDeleteStatus, selectPostsError } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import PostAuthor from "../components/PostAuthor";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { IoIosAlert } from "react-icons/io";


const Post = () => {

   // rrd
   const navigate = useNavigate();
   const { postId } = useParams();

   // Redux
   const dispatch = useDispatch();
   const postDeleteStatus = useSelector(selectPostsDeleteStatus);
   const postError = useSelector(selectPostsError);
   const post = useSelector(state => selectPostById(state, postId));
   

   // callbacks
   const handleDeletePost = async () => {
      try {
         await dispatch(
            deletePostThunk(postId)
         )
         navigate("/");
      } catch (error) {
         toast.error(error.message);
         console.warn(error.message);
      }
   }


   if (!post) {
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
   

   return (
      <section className="container">
         <div className="d-flex align-items-center">
            <h2 className="flex-grow-1">
               {
                  post.title
               }
            </h2>
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
                  <button onClick={handleDeletePost} type="button" disabled={postDeleteStatus === 'pending'} className="btn btn-outline-danger" >
                     {
                        (postDeleteStatus === 'pending') ? (
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
         <PostAuthor userId={post.user} />
         <hr />
         <p>
            {
               post.content
            }
         </p>
      </section>
   );
}
 
export default Post;