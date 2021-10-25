import { combineReducers } from 'redux';
import { user, requisitarToken, generateQuestions } from './user';

const rootReducer = combineReducers({ user, requisitarToken, generateQuestions });

export default rootReducer;
