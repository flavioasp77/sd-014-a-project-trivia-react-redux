import { combineReducers } from 'redux';
import player from './userReducer';

const rootReducer = combineReducers({
  player,
});

export default rootReducer;
