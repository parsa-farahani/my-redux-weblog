import { createSlice } from "@reduxjs/toolkit";
import { addUserServer, deleteUserServer, getUserServer, getUsersServer } from "../../services/usersServices";

const initialState = [];


const usersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {
      loadUsers: (state, action) => {
         return action.payload;
      },
      addUser: (state, action) => {
         state.push(action.payload);
      },
      deleteUser: (state, action) => {
         const { userId } = action.payload;
         return state.filter(user => user.id !== userId);
      },
   },
   extraReducers: (builder) => {}
});


// Thunks
// + fetch
export const fetchUsersThunk = () => {
   return async (dispatch, getState) => {
      const response = await getUsersServer();  // the error is handled outside
      dispatch(
         loadUsers(response.data)
      );
   }
};

// + add
export const addUserThunk = (user) => {
   return async (dispatch, getState) => {
      const response = await addUserServer(user);
      dispatch(
         addUser(response.data)
      );
   }
};

// + delete
export const deleteUserThunk = (userId) => {
   return async (dispatch, getState) => {
      await deleteUserServer(userId);
      dispatch(
         deleteUser( { userId } )
      );
   }
};


// Selectors
export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);


// Action-Creatos
export const {
   loadUsers,
   addUser,
   deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;