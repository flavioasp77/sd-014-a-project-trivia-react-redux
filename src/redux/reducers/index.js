import { combineReducers } from 'redux';
import user from './user';

const rootReducer = combineReducers({
  user,
  // assertions,
  // score,
  // gravatarEmail,
});

export default rootReducer;
