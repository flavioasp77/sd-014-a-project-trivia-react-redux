import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';

const rootReducer = combineReducers({ user }, composeWithDevTools());

export default rootReducer;
