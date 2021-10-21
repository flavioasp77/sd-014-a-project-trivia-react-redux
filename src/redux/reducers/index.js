import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import playerReducer from './playerReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  trivia: questionReducer,
});

export default rootReducer;
