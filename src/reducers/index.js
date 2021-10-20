import { combineReducers } from 'redux';
import player from './player';
import questions from './quest';

const rootReducer = combineReducers({ player, questions });

export default rootReducer;
