export const SET_PLAYER = 'SET_PLAYER';
export const GET_TIME = 'GET_TIME';
export const SET_SCORE = 'SET_SCORE';
export const REST_TIMER = 'REST_TIMER';

export const setPlayer = (name, img) => ({
  type: SET_PLAYER,
  name,
  img,
});

export const getTime = (timer) => ({
  type: GET_TIME,
  timer,
});

export const setScore = (score) => ({
  type: SET_SCORE,
  score,
});

export const resetTimer = (setTime) => ({
  type: REST_TIMER,
  setTime,
});
