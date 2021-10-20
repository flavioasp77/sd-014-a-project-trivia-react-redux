export const USER_INFO = 'USER_INFO';

export const userInfo = (user, email) => ({
  type: USER_INFO,
  payload: {
    user,
    email,
  },
});
