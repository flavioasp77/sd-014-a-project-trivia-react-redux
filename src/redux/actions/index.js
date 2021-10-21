export const USER_INFO = 'USER_INFO';

export const userInfo = ({ name, gravatarEmail }) => ({
  type: USER_INFO,
  payload: {
    name,
    gravatarEmail,
  },
});
