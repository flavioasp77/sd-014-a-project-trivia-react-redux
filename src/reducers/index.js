import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamerReducer from './gamerReducer';
import questReducer from './questReducer';

const rootReducer = combineReducers({
  user: userReducer,
  token: gamerReducer,
  game: questReducer,
});

export default rootReducer;
