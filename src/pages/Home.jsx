import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import PostAuthor from "../components/PostAuthor";
import { selectPostById } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";

const Post = ({postId}) => {

   // Redux
   const post = useSelector(state => selectPostById(state, postId));

   return (
      <article className="post">
         <div className="row" >
            <h3 className="col-8" >
               {
                  post.title
               }
            </h3>
            <PostAuthor userId={post.user} />
         </div>
         <hr />
         <p>
            {
               post.content
            }
         </p>
         <Link to={`/posts/${post.id}`} className="btn btn-outline-light" >
            View More
         </Link>
      </article>
   )
}

const Home = () => {
   // Redux
   const posts = useSelector(selectAllPosts);

   return (
      <section className="container">
         <h2>
            All Posts
         </h2>
         <hr />
         <div className="posts-list">
            {
               posts.map(post => (
                  <Post key={post.id} postId={post.id} />
               ))
            }
         </div>      
      </section>
   );
}
 
export default Home;