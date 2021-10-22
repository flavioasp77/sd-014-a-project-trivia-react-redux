import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamerReducer from './gamerReducer';

const rootReducer = combineReducers({
  user: userReducer,
  token: gamerReducer,
});

export default rootReducer;
