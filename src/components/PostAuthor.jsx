import { useSelector } from "react-redux";
// import { selectUserById } from "../features/users/usersSlice";
// import { useGetUserQuery } from "../features/users/usersSlice";

const PostAuthor = ( { userId, ...restProps } ) => {

   // RTK-Query
   // const {
   //    data: user,
   //    isLoading: isLoadingUser,
   //    isSuccess: isSuccessUser,
   //    isError: isErrorUser,
   //    error: userError,
   // } = useGetUserQuery(userId);

   let user, isLoadingUser, isErrorUser, isSuccessUser;


   // Rendering content
   if ((!user && !isLoadingUser) || isErrorUser) {
      return (
         <p className="text-secondary h6 m-0" {...restProps} >
            By: Unknown Author
         </p>
      )
   }


   let authorContent;

   if (isLoadingUser) {
      authorContent = (
         <span className="loader" style={{ display: 'inline-block', width: "12px", height: "12px" }}></span>
      );
   } else if (isSuccessUser) {
      authorContent = (
         <span>
            {
               user.fullname
            }
         </span>
      )
   }

   return (
      <p className="text-secondary h6 m-0 d-flex align-items-center" {...restProps} >
         <span>
            By:
         </span>
         &nbsp;
         {
            authorContent
         }
      </p>
   );
}
 
export default PostAuthor;