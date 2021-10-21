export const LOGIN_USER = 'LOGIN_USER';

export const addLoginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export function fetchGetToken() {
  return async () => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const responseJsonApi = await response.json();
      const { token } = responseJsonApi;
      localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
      console.error(error);
    }
  };
}
