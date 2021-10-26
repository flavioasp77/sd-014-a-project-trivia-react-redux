export const USER_INFO = 'USER_INFO';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';

export const userInfo = ({ name, gravatarEmail, score }) => ({
  type: USER_INFO,
  payload: {
    name,
    gravatarEmail,
    score,
  },
});
