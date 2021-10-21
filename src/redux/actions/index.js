export const USER_INFO = 'USER_INFO';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SET_ANSWERED = 'SET_ANSWERED';
export const SAVE_SCORE = 'SAVE_SCORE';

export function saveUserInfo(payload) {
  return {
    type: USER_INFO,
    payload,
  };
}

export function saveScore(payload) {
  return {
    type: SAVE_SCORE,
    payload,
  };
}
