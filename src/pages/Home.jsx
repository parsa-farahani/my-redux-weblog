import { useDispatch, useSelector } from "react-redux";
import { fetchPostsThunk, selectAllPosts, selectPostById, selectPostsError, selectPostsFetchStatus } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import PostAuthor from "../components/PostAuthor";
import { useEffect } from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Post = ( { postId } ) => {
   // Redux
   const post = useSelector(state => selectPostById(state, postId));

   return (
      <article className="post">
         <div className="d-flex align-items-center gap-4 mb-4" >
            <h3 className="m-0" >
               {
                  post.title
               }
            </h3>
            <div >
               <PostAuthor userId={post.user} />
            </div>
         </div>
         
         <p>
            {
               post.content
            }
         </p>

         <div>
            <Link to={`/posts/${post.id}`} className="btn btn-outline-light" >
               view post
            </Link>
         </div>
      </article>
   )
}

const Home = () => {
   // Redux
   const dispatch = useDispatch();
   const posts = useSelector(selectAllPosts);
   const postsFetchStatus = useSelector(selectPostsFetchStatus);
   const postsError = useSelector(selectPostsError);

   // useEffect(() => {
   //    let ignore = false

   //    const fetchPosts = async () => {
   //       try {
   //          await dispatch(
   //             fetchPostsThunk()
   //          )
   //       } catch (error) {
   //          toast.error("Error fetch Posts: " + error.message);
   //          console.warn(error);
   //       }
   //    }

   //    if (postsFetchStatus === "idle" && !ignore) {
   //       fetchPosts();
   //    }

   //    return () => {
   //       ignore = true;
   //    }
   // }, [dispatch])


   return (
      <section className="container">
         <h2>
            All Posts
         </h2>
         <hr />
         {
            (postsFetchStatus === 'completed') ? (
               <div className="posts-list">
                  {
                     posts.map(post => (
                        <Post key={post.id} postId={post.id} />
                     ))
                  }
               </div>      
            ) : (postsFetchStatus === "pending") ? (
               <p>
                  Loading posts...
               </p>
            ) : (postsFetchStatus === "failed") ? (
               <p className="text-danger">
                  <span className="icon me-2" style={{verticalAlign: "bottom"}}>
                     <MdError />
                  </span>
                  <span>
                     {
                        postsError
                     }
                  </span>
                  {" | "}
                  <span>
                     Please try again
                  </span>
               </p>
            ) : null
         }
      </section>
   );
}
 
export default Home;