import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, selectPostById, selectPostsError, selectPostsFetchStatus } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import PostAuthor from "../components/PostAuthor";
import { memo, useEffect } from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PostDate from "../components/PostDate";
import { useGetPostQuery } from "../api/apiSlice";

let Post = ( { postId } ) => {
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
            <div className="d-flex gap-3" >
               <PostAuthor userId={post.user} />
               <span className="text-secondary">
                  &#x2022;
               </span>
               <PostDate timeStampISO={post.date} />
            </div>
         </div>
         
         <hr />

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

Post = memo(Post);

const Home = () => {
   // Redux
   // const dispatch = useDispatch();
   // const posts = useSelector(selectAllPosts);
   // const postsFetchStatus = useSelector(selectPostsFetchStatus);
   // const postsError = useSelector(selectPostsError);

   // RTK-Query
   const {
      data: posts = [],
      isLoading: isLoadingPosts,
      isError: isErrorPosts,
      isSuccess: isSuccessPosts,
      error: postsError
   } = useGetPostQuery();


   if (!posts) {
      return (
         <div className="container py-4">
            <p className="alert alert-secondary">
               Not found any Post!
            </p>
         </div>
      )
   }

   return (
      <section className="container">
         <h2>
            All Posts
         </h2>
         <hr />
         {
            (isSuccessPosts) ? (
               <div className="posts-list">
                  {
                     posts.map(post => (
                        <Post key={post.id} postId={post.id} />
                     ))
                  }
               </div>      
            ) : (isLoadingPosts) ? (
               <p>
                  Loading posts...
               </p>
            ) : (isErrorPosts) ? (
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