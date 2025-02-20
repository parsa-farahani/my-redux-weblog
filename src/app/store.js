
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';
import { usersReducer } from '../features/users/usersSlice';
import { thunk as thunkMiddleware } from 'redux-thunk';
import { postsReducer } from '../features/posts/postsSlice';
import { myThunkMiddleware } from './middleware';


const rootReducer = combineReducers({
   users: usersReducer,
   posts: postsReducer,
});


const composedEnhancer = composeWithDevTools( applyMiddleware(thunkMiddleware) );
// my Custom Thunk Middleware (it can be used instead of above middleware!)
// const composedEnhancer = composeWithDevTools( applyMiddleware(myThunkMiddleware) );


export const store = createStore( rootReducer, undefined, composedEnhancer );