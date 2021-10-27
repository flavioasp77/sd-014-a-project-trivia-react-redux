import { combineReducers } from 'redux';
import { user, requisitarToken, updateScore } from './user';
import generateQuestions from './game';

const rootReducer = combineReducers({ user,
  requisitarToken,
  generateQuestions,
  updateScore });

export default rootReducer;
