import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../features/users/usersSlice";
import { selectUserPosts } from "../features/posts/postsSlice";

const User = () => {

   // rrd
   const { userId } = useParams();

   // Redux
   const user = useSelector(state => selectUserById(state, userId));
   const userPosts = useSelector(state => selectUserPosts(state, userId));

   return (
      <section className="container">
         <h2>
            {
               user.fullname
            }
         </h2>
         <hr />
         <div>
            <ul>
               {
                  userPosts.map(post => (
                     <li key={post.id} >
                        <Link to={`/posts/${post.id}`} >
                           {
                              post.title
                           }
                        </Link>
                     </li>
                  ))
               }
            </ul>
         </div>
      </section>
   );
}
 
export default User;