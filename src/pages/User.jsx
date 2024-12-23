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

   if (!user) {
      return (
         <div className="container">
            <p>
               Not Found the User
            </p>
         </div>
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
            <div>
               {
                  (userPosts && userPosts.length > 0) ? (
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
                  ) : (
                     <p>
                        This user hasn not any post yet!
                     </p>
                  )
               }
            </div>
         </div>
      </section>
   );
}
 
export default User;