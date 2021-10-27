export const USER_INFO = 'USER_INFO';
export const ADD_SCORE = 'ADD_SCORE';

export const userInfo = ({ name, gravatarEmail, score }) => ({
  type: USER_INFO,
  payload: {
    name,
    gravatarEmail,
    score,
  },
});

export const attScore = (score) => ({
  type: ADD_SCORE,
  payload: {
    score,
  },
});
