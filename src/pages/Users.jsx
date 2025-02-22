import { useDispatch, useSelector } from "react-redux";
import { addNewUser, deleteUser, fetchUsers, selectAllUsers, selectUsersError, selectUsersStatus } from "../features/users/usersSlice";
import { Link } from "react-router-dom";
import { MdDelete, MdError, MdRefresh } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { nanoid } from "nanoid";


const Users = () => {

   // states
   const [ newUser, setNewUser ] = useState("");
   
   // Redux
   const dispatch = useDispatch();
   const users = useSelector(selectAllUsers);
   const usersError = useSelector(selectUsersError);
   const usersStatus = useSelector(selectUsersStatus);

   const isLoadingUsers = usersStatus.fetch === "loading";
   const isSuccessUsers = usersStatus.fetch === "completed";
   const isErrorUsers = usersStatus.fetch === "failed";

   const isLoadingAddUser = usersStatus.add === "loading";
   const isSuccessAddUser = usersStatus.add === "completed";
   const isErrorAddUser = usersStatus.add === "failed";

   const isLoadingDeleteUser = usersStatus.delete === "loading";
   const isSuccessDeleteUser = usersStatus.delete === "completed";
   const isErrorDeleteUser = usersStatus.delete === "failed";



   // callbacks
   const handleReFetchUsers = async () => {  // re-fetches users, if user click on the corresponding <button>

      try {
         await dispatch( fetchUsers );
      } catch (error) {
         toast.error("Error fetch Users - Status: " + error.status);
         console.warn(error);
      }
   }


   const handleNewUserChange = (e) => {
      setNewUser(e.target.value);
   }


   const canSaveNewUser = Boolean(newUser) && !isLoadingUsers;

   const handleSubmitAddUser = async (e) => {
      e.preventDefault();
      if (canSaveNewUser) {
         try {
            await dispatch(
               addNewUser(
                  {
                     id: nanoid(),
                     fullname: newUser,
                  }
               )
            );
            setNewUser("");
         } catch (error) {
            console.warn(error?.message);
            toast.error(error?.message);  
         }
      }
   }

   const handleDeleteUser = async (userId) => {
      if (!isLoadingDeleteUser) {
         try {
            await dispatch(
               deleteUser(userId)
            )
         } catch (error) {
            console.warn(error?.message);
            toast.error(error?.message);  
         }
      }
   }


   let usersContent;

   if (isLoadingUsers) {
      usersContent = (
         <p className="h6 d-flex align-items-center justify-content-center">
            <span>
               Loading Users...
            </span>
            {" "}
            <span className="loader" style={{ width: "30px", height: "30px" }}></span>
         </p>
      );
   } else if (isSuccessUsers) {
      usersContent = (
         <ul>
            {
               users.map(user => (
                  <li key={user.id} className="d-flex justify-content-between mb-2">
                     <Link to={`/users/${user.id}`} >
                        {
                           user.fullname
                        }
                     </Link>
                     <button onClick={() => handleDeleteUser(user.id)} type="button" disabled={isLoadingDeleteUser} className="btn btn-sm rounded-circle btn-outline-danger">
                        <span className="icon">
                           <MdDelete />
                        </span>
                     </button>
                  </li>
               ))
            }
         </ul>
      );
   } else if (isErrorUsers) {
      let errorMessage;

      if (usersError.message) {
         errorMessage = "Error Fetching Users - " + usersError.message;
      } else if (usersError.status) {
         errorMessage = "Error Fetching Users - Server-Status: " + usersError.status;
      } else {
         errorMessage = "Error Fetching Users";
      }

      usersContent = (
         <div>
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
            <button
               onClick={handleReFetchUsers}
               type="button"
               className="btn btn-outline-light"
            >
               <span>
                  Try again 
               </span>
               <span>
                  <MdRefresh />
               </span>
            </button>
         </div>
      );
   }


   // Rendering Content

   if (!isLoadingUsers && users && users.length <= 0) {
      return (
         <section className="container">
            <div className="alert alert-secondary">
               <p>
                  <span className="icon me-2" style={{ verticalAlign: 'bottom' }}>
                     <IoIosAlert />
                  </span>
                  <span className="h5" >
                     Not Found any User
                  </span>
               </p>
               <button
                  onClick={handleReFetchUsers}
                  type="button"
                  className="btn btn-outline-dark"
               >
                  <span>
                     Try again 
                  </span>
                  <span>
                     <MdRefresh />
                  </span>
               </button>
            </div>
         </section>
      )
   }


   return (
      <section className="container">
         <h2>
            Users
         </h2>
         <hr />
         <div className="row">
            <div className="col-xs-12 col-md-6">
               {
                  usersContent
               }
            </div>
            <div className="col-xs-12 col-md-6">
               <form onSubmit={handleSubmitAddUser} >
                  <div className="mb-3">
                     <label
                        htmlFor="new-user"
                        className="h4"
                     >
                        Add User
                     </label>
                     <input
                        type="text"
                        id="new-user"
                        name="new-user"
                        value={newUser}
                        onChange={handleNewUserChange}
                        spellCheck={false}
                        disabled={isLoadingUsers || isLoadingAddUser || isLoadingDeleteUser}
                        placeholder="New User..."
                        className="form-control"
                     />
                  </div>
                  <div>
                     <button 
                        type="submit"
                        disabled={!canSaveNewUser || isLoadingUsers || isLoadingAddUser || isLoadingDeleteUser}
                        className="btn btn-md btn-primary"
                     >
                        <span className="icon me-2">
                           <FaCheck />
                        </span>
                        <span>
                           {
                              (isLoadingAddUser) ? (
                                 "Saving..."
                              ) : (
                                 "Save User"
                              )
                           }
                        </span>
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
}
 
export default Users;