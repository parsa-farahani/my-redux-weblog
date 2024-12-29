import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { addUserServer, deleteUserServer, getUserServer, getUsersServer } from "../../services/usersServices";
import apiSlice from "../../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query({
         query: () => '/users',
         providesTags: ["USER"],
      }),
      getUser: builder.query({
         query: (userId) => `/users/${userId}`,
         providesTags: (result, error, arg) => [
            { type: "USER", id: arg },
         ],
      }),
      addNewUser: builder.mutation({
         query: (user) => ({
            url: '/users',
            method: 'POST',
            body: user,
         }),
         invalidatesTags: ["USER"],
      }),
      deleteUser: builder.mutation({
         query: (userId) => ({
            url: `/users/${userId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ["USER"],
      }),
   })
})



const usersSlice = createSlice({
   name: "users",
   initialState: {
      status: {
         fetchUsers: "idle",
      },
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
      .addMatcher(
         extendedApiSlice.endpoints.getUsers.matchPending,
         (state, action) => {
            state.status.fetchUsers = "pending";
         }
      )
      .addMatcher(
         extendedApiSlice.endpoints.getUsers.matchFulfilled,
         (state, action) => {
            state.status.fetchUsers = "completed";
         }
      )
      .addMatcher(
         extendedApiSlice.endpoints.getUsers.matchRejected,
         (state, action) => {
            state.status.fetchUsers = "failed";
            state.error = action.error;
         }
      )
   }
});




// Selectors
const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();  // users-data is inside '.data' field

export const selectAllUsers = createSelector(
   selectUsersResult,
   (usersResult) => usersResult.data
);

export const selectUserById = createSelector(  // args: state, userId
   selectAllUsers,
   (state, userId) => userId,
   (allUsers, userId) => allUsers.find(user => user.id === userId)
);

export const selectUsersError = state => state.users.error;

export const selectUsersStatus = state => state.users.status;



// apiSlice Hooks
export const {
   useGetUsersQuery,
   useGetUserQuery,
   useAddNewUserMutation,
   useDeleteUserMutation,
} = extendedApiSlice;

export default usersSlice.reducer;