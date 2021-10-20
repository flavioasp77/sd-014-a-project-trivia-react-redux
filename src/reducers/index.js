import { combineReducers } from 'redux';
import login from './login';
import tokenReducer from './token';

const rootReducer = combineReducers({
  login,
  tokenReducer,
});

export default rootReducer;
