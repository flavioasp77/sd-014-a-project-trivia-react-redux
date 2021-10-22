export const GET_TOKEN = 'GET_TOKEN';
export const USER = 'USER';

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const user = (username, email) => ({
  type: USER,
  payload: {
    username,
    email,
  },
});

export const tokenApi = () => async () => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await data.json();
  const token = json;
  localStorage.setItem('token', JSON.stringify(token));
};
