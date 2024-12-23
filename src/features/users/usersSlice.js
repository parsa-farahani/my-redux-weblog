import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserServer, deleteUserServer, getUserServer, getUsersServer } from "../../services/usersServices";

const initialState = [];


const usersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
      .addCase( fetchUsersThunk.fulfilled, (state, action) => {
         return action.payload;
      } )
      .addCase( addUserThunk.fulfilled, (state, action) => {
         state.push(action.payload);
      } )
      .addCase( deleteUserThunk.fulfilled, (state, action) => {
         const userId = action.payload;
         return state.filter(user => user.id !== userId);
      } )
   }
});


// Thunks
// + fetch
export const fetchUsersThunk = createAsyncThunk( "users/fetchUsers", async () => {
   const response = await getUsersServer();
   return response.data;
} );


// + add
export const addUserThunk = createAsyncThunk( "users/adduser", async (user) => {
   const response = await addUserServer(user);
   return response.data;
} );


// + delete
export const deleteUserThunk = createAsyncThunk( "users/deleteUser", async (userId) => {
   await deleteUserServer(userId);
   return userId;
} );



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