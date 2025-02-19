
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';
import { usersReducer } from '../features/users/usersSlice';
import { thunk as thunkMiddleware } from 'redux-thunk';


const rootReducer = combineReducers({
   users: usersReducer,
});


const composedEnhancer = composeWithDevTools( applyMiddleware(thunkMiddleware) );


export const store = createStore( rootReducer, undefined, composedEnhancer );