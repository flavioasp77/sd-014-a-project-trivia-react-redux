import { combineReducers } from 'redux';
import { user, requisitarToken } from './user';

const rootReducer = combineReducers({ user, requisitarToken });

export default rootReducer;
