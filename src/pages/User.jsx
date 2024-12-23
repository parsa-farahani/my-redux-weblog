import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../features/users/usersSlice";
import { selectUserPosts } from "../features/posts/postsSlice";
import { IoIosAlert } from "react-icons/io";



const User = () => {

   // rrd
   const { userId } = useParams();

   // Redux
   const user = useSelector(state => selectUserById(state, userId));
   const userPosts = useSelector(state => selectUserPosts(state, userId));

   if (!user) {
      return (
         <section className="container">
            <p className="alert alert-secondary">
               <span className="icon me-2">
                  <IoIosAlert />
               </span>
               <span>
                  Not Found the User
               </span>
            </p>
         </section>
      )
   }

   return (
      <section className="container">
         <h2>
            {
               user.fullname
            }
         </h2>
         <hr />
         <div>
            <h3 className="h5">
               Posts
            </h3>
            <ul>
               {
                  userPosts.map(post => (
                     <li key={post.id}>
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