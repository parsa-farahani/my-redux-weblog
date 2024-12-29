import { useDispatch, useSelector } from "react-redux";
// import { selectAllPosts, selectPostById, selectPostsError, selectPostsFetchStatus } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import PostAuthor from "../components/PostAuthor";
import { memo, useEffect, useMemo } from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PostDate from "../components/PostDate";
import apiSlice, { useGetPostsQuery } from "../api/apiSlice";

let Post = ({ post }) => {
   return (
      <article className="post">
         <div className="d-flex align-items-center gap-4 mb-4">
            <h3 className="m-0">{post.title}</h3>
            <div className="d-flex gap-3">
               <PostAuthor userId={post.user} />
               <span className="text-secondary">&#x2022;</span>
               <PostDate timeStampISO={post.date} />
            </div>
         </div>

         <hr />

         <p>{post.content}</p>

         <div>
            <Link to={`/posts/${post.id}`} className="btn btn-outline-light">
               view post
            </Link>
         </div>
      </article>
   );
};

Post = memo(Post);

const Home = () => {
   // RTK-Query
   const {
      data: posts = [],
      isLoading: isLoadingPosts,
      isError: isErrorPosts,
      isSuccess: isSuccessPosts,
      error: postsError,
   } = useGetPostsQuery();


   const sortedPosts = useMemo(() => {
      return posts.slice().sort((p1, p2) => p2.date.localeCompare(p1.date))
   }, [posts])


   // ------ Rendeing Content ---------

   if (!isLoadingPosts && !posts) {
      return (
         <div className="container py-4">
            <p className="alert alert-secondary">Not found any Post!</p>
         </div>
      );
   }


   let postsContent;

   if (isLoadingPosts) {
      postsContent = <p>Loading posts...</p>;
   } else if (isSuccessPosts) {
      postsContent = (
         <div className="posts-list">
            {
               sortedPosts.map((post) => (
                  <Post key={post.id} post={post} />
               ))
            }
         </div>
      );
   } else if (isErrorPosts) {
      let errorMessage;
      if (postsError.status === 404) {
         errorMessage = "Error Fetching Posts - Not Found!";
      } else {
         errorMessage = "Error Fetching Posts!";
      }

      postsContent = (
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
      );
   }

   return (
      <section className="container">
         <h2>All Posts</h2>
         <hr />
         {postsContent}
      </section>
   );
};

export default Home;
