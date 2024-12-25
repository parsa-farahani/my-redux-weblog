import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addUserServer, deleteUserServer, getUserServer, getUsersServer } from "../../services/usersServices";


const usersAdapter = createEntityAdapter();  // it hasn't any 'sort-comparer'

const initialState = usersAdapter.getInitialState();
// { ids: [userId, ...], entities: { userId: user } }



const usersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
      .addCase( fetchUsersThunk.fulfilled, usersAdapter.setAll)  // usersAdapter.setAll(state, action.payload);
      .addCase( addUserThunk.fulfilled, usersAdapter.addOne)   // usersAdapter.addOne(state, action.payload);
      .addCase( deleteUserThunk.fulfilled, usersAdapter.removeOne)  // usersAdapter.removeOne(state, action.payload);
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
export const {
   selectAll: selectAllUsers,
   selectById: selectUserById,
} = usersAdapter.getSelectors( state => state.users );


// Action-Creators


export default usersSlice.reducer;