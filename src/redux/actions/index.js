export const USER_INFO = 'USER_INFO';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';

export const userInfo = ({ name, gravatarEmail }) => ({
  type: USER_INFO,
  payload: {
    name,
    gravatarEmail,
  },
});

export const disableButton = () => ({
  type: DISABLE_BUTTON,
});
