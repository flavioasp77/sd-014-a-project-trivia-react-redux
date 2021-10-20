import LOGIN from './actionTypes';

const login = (email, name) => ({
  type: LOGIN,
  name,
  email,
});

export default login;
