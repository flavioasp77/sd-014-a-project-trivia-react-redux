import { combineReducers } from 'redux';
import { user, requisitarToken, playReducer } from './user';

const rootReducer = combineReducers({ user, requisitarToken, playReducer });

export default rootReducer;
