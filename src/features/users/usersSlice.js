import { produce } from "immer";
import { addUserServer, deleteUserServer, getUsersServer } from '../../services/usersServices';

const INITIAL_STATE = {
   users: [],
   status: {  // 'idle', loading, completed, failed
      fetch: 'idle',
      add: 'idle',
      delete: 'idle',
   },
   error: null,
};


export const usersReducer = produce((state = INITIAL_STATE, action) => {
   switch (action.type) {

      case "users/usersOperationLoading": {  // payload: operation-name (fetch, add, delete)
         const operationName = action.payload;
         state.status[operationName] = 'loading';
         break;
      }

      case "users/usersOperationFailed": {  // payload: operation-name (fetch, add, delete)
         const operationName = action.payload;
         const error = action.error;
         state.status[operationName] = 'failed';
         state.error = error;
         break;
      }

      case "users/usersLoaded": {
         state.users = action.payload;
         state.status.fetch = 'completed';
         break;
      }

      case "users/userAdded": {
         state.users.push( action.payload );
         state.status.add = 'completed';
         break;
      }

      case "users/userDeleted": {
         state.users = state.users.filter(user => user.id !== action.payload);
         state.status.delete = 'completed';
         break;
      }

      default:
         return state;
   }
})

// Action Creators
export const usersOperationLoading = (operationName) => ({
   type: 'users/usersOperationLoading',
   payload: operationName,
})

export const usersOperationFailed = (operationName, error) => ({
   type: 'users/usersOperationFailed',
   payload: operationName,
   error,
})

export const usersLoaded = (usersData) => ({
   type: 'users/usersLoaded',
   payload: usersData,
})


export const userAdded = (userData) => ({
   type: 'users/userAdded',
   payload: userData,
})

export const userDeleted = (userId) => ({
   type: 'users/userDeleted',
   payload: userId,
})


// Thunks
export const fetchUsers = () => {
   return async (dispatch, getState) => {

      dispatch(
         usersOperationLoading('fetch')
      )

      try {
         const response = await getUsersServer();

         dispatch(
            usersLoaded(response.data)
         )
      } catch (error) {
         console.warn(error);
         dispatch(
            usersOperationFailed('fetch', error.message ?? error.status ?? error.toString())
         )
      }
   }
}

export const addNewUser = (user) => {
   return async (dispatch, getState) => {

      dispatch(
         usersOperationLoading('add')
      )

      try {
         const response = await addUserServer(user);

         dispatch(
            userAdded(response.data)
         )
      } catch (error) {
         console.warn(error);
         dispatch(
            usersOperationFailed('add', error.message ?? error.status ?? error.toString())
         )
      }
   }
}

export const deleteUser = (userId) => {
   return async (dispatch, getState) => {

      dispatch(
         usersOperationLoading('delete')
      )

      try {
         const response = await deleteUserServer(userId);

         dispatch(
            userDeleted(userId)
         )
      } catch (error) {
         console.warn(error);
         dispatch(
            usersOperationFailed('delete', error.message ?? error.status ?? error.toString())
         )
      }
   }
}


// Selectors
export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) => state.users.users.find(user => user.id === userId);
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;