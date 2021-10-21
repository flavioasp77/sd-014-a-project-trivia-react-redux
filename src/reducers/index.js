import { combineReducers } from 'redux';
import login from './login';
import tokenReducer from './token';
import questions from './questions';

const rootReducer = combineReducers({
  user: login,
  token: tokenReducer,
  questions,
});

export default rootReducer;
