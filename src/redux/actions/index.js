export const LOGIN = 'LOGIN';

// Actions:
export const loginAction = ({ name, email }) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

// Assicronas:
