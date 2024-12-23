import { createSlice } from "@reduxjs/toolkit";

const initialState = [];


const usersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {
      loadUsers: (state, action) => {
         return action.payload;
      }
   },
   extraReducers: (builder) => {}
});



// Selectors
export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);


// Action-Creatos
export const {
   loadUsers,
} = usersSlice.actions;

export default usersSlice.reducer;