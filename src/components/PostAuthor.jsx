import { useSelector } from "react-redux";
import { selectUserById } from "../features/users/usersSlice";

const PostAuthor = ( { userId, ...restProps } ) => {

   // Redux
   const user = useSelector(state => selectUserById(state, userId));


   return (
      <p className="text-secondary h6 m-0" {...restProps} >
         By: 
         {" "}
         {
            (user) ? (
               user.fullname
            ) : (
               "Unknown Author"
            )
         }
      </p>
   );
}
 
export default PostAuthor;