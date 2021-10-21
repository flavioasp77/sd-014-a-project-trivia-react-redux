export const USER_INFO = 'USER_INFO';

export function saveUserInfo(payload) {
  return {
    type: USER_INFO,
    payload,
  };
}

export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SET_ANSWERED = 'SET_ANSWERED';

export const MY_SCORE = 'MY_SCORE';