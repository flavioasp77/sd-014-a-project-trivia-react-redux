import { combineReducers } from 'redux';
import login from './login';
import tokenReducer from './token';

const rootReducer = combineReducers({
  user: login,
  token: tokenReducer,
});

export default rootReducer;
