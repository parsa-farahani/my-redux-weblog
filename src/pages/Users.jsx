import { useDispatch, useSelector } from "react-redux";
import { addUser, addUserThunk, deleteUserThunk, fetchUsersThunk, selectAllUsers } from "../features/users/usersSlice";
import { Link } from "react-router-dom";
import { MdDelete, MdRefresh } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import { toast } from "react-toastify";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { FaCheck } from "react-icons/fa";

const Users = () => {

   // states
   const [ newUser, setNewUser ] = useState("");
   const [ addUserStatus, setAddUserStatus ] = useState("idle");
   const [ deleteUserStatus, setDeleteUserStatus ] = useState("idle");
   
   // Redux
   const users = useSelector(selectAllUsers);
   const dispatch = useDispatch();

   // callbacks
   const handleFetchUsers = async () => {

      try {
         await dispatch(
            fetchUsersThunk()
         );
      } catch (error) {
         toast.error("Error fetch Users: " + error.message);
         console.warn(error);
      }
   }

   const handleNewUserChange = (e) => {
      setNewUser(e.target.value);
   }

   const canSaveNewUser = newUser;

   const handleSubmitNewUser = async (e) => {
      e.preventDefault();
      if (canSaveNewUser) {
         setAddUserStatus("pending");
         try {
            await dispatch(
               addUserThunk({
                  id: nanoid(),
                  fullname: newUser,
               })
            );
            setNewUser("");
         } catch (error) {
            console.warn(error.message);
            toast.error(error.message);  
         } finally {
            setAddUserStatus("idle");
         }
      }
   }

   const handleDeleteUser = async (userId) => {
      if (deleteUserStatus === "idle") {
         setDeleteUserStatus("pending");
         try {
            await dispatch(
               deleteUserThunk(userId)
            );
         } catch (error) {
            console.warn(error.message);
            toast.error(error.message);  
         } finally {
            setDeleteUserStatus("idle");
         }
      }
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
                  (users && users.length <= 0) ? (
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
                           onClick={handleFetchUsers}
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
                  ) : (
                     <ul>
                        {
                           users.map(user => (
                              <li key={user.id} className="d-flex justify-content-between mb-2">
                                 <Link to={`/users/${user.id}`} >
                                    {
                                       user.fullname
                                    }
                                 </Link>
                                 <button onClick={() => handleDeleteUser(user.id)} type="button" disabled={deleteUserStatus === "pending"} className="btn btn-sm rounded-circle btn-outline-danger">
                                    <span className="icon">
                                       <MdDelete />
                                    </span>
                                 </button>
                              </li>
                           ))
                        }
                     </ul>
                  )
               }
            </div>
            <div className="col-xs-12 col-md-6">
               <form onSubmit={handleSubmitNewUser} >
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
                        placeholder="New User..."
                        className="form-control"
                     />
                  </div>
                  <div>
                     <button type="submit" disabled={!canSaveNewUser || addUserStatus === "pending"} className="btn btn-md btn-primary">
                        <span className="icon me-2">
                           <FaCheck />
                        </span>
                        <span>
                           {
                              (addUserStatus === "pending") ? (
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