export const SET_GRAVATAR_EMAIL = 'REQUEST_GRAVATAR';
export const SET_USERNAME = 'SET_USERNAME';

export const setGravatarEmail = (payload) => ({
  type: SET_GRAVATAR_EMAIL,
  payload,
});

export const setUsername = (payload) => ({
  type: SET_USERNAME,
  payload,
});
