import { combineReducers } from 'redux';
import userReducer from './user';
import scoreReducer from './score';

const rootReducer = combineReducers({
  user: userReducer,
  score: scoreReducer,
});

export default rootReducer;
