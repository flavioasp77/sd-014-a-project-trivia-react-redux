import { combineReducers } from 'redux';
import { user, requisitarToken } from './user';
import generateQuestions from './game';

const rootReducer = combineReducers({ user, requisitarToken, generateQuestions });

export default rootReducer;
