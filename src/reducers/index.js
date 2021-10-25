import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import settings from './settings';
import questionTimer from './questionTimer';

const rootReducer = combineReducers({
  user,
  game,
  settings,
  questionTimer,
});

export default rootReducer;
