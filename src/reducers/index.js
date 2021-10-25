import { combineReducers } from 'redux';
import login from './login';
import tokenReducer from './token';
import questions from './questions';
import score from './score';

const rootReducer = combineReducers({
  user: login,
  token: tokenReducer,
  questions,
  score,
});

export default rootReducer;
