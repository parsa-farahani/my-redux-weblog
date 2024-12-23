import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPostById } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import PostAuthor from "../components/PostAuthor";


const Post = () => {

   // rrd
   const { postId } = useParams();

   // Redux
   const post = useSelector(state => selectPostById(state, postId));
   const postAuthor = useSelector(state => selectUserById(state, post.user));

   
   return (
      <section className="container">
         <div>
            <h2>
               {
                  post.title
               }
            </h2>
            <PostAuthor userId={postAuthor.id} />
         </div>
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