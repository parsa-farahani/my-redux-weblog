import { useSelector } from "react-redux";
import { selectUserById } from "../features/users/usersSlice";

const PostAuthor = ({userId}) => {

   // Redux
   const user = useSelector(state => selectUserById(state, userId));


   return (
      <span className="text-secondary">
         by: 
         {" "}
         {
            (user) ? (
               user.fullname
            ) : (
               "Unknown User"
            )
         }
      </span>
   );
}
 
export default PostAuthor;