import { combineReducers } from 'redux';
import player from './userReducer';
import game from './gameReducer';

const rootReducer = combineReducers({
  player,
  game,
});

export default rootReducer;
