import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";
import { Link } from "react-router-dom";

const Users = () => {
   
   // Redux
   const users = useSelector(selectAllUsers);

   return (
      <section className="container">
         <h2>
            Users
         </h2>
         <div>
            <ul>
               {
                  users.map(user => (
                     <li key={user.id}>
                        <Link to={`/users/${user.id}`} >
                           {
                              user.fullname
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
 
export default Users;