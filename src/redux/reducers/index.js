import { combineReducers } from 'redux';
import tokenReducer from './gamerReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
});

export default rootReducer;
