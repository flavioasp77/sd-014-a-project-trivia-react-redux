export const LOGIN_USER = 'LOGIN_USER';
export const GET_DATA = 'GET_DATA';

export const addLoginUser = (payload) => ({ type: LOGIN_USER, payload });

export const getData = (payload) => ({ type: GET_DATA, payload });

export function fetchGetToken() {
  return async () => {
    try {
      const response = await fetch(
        'https://opentdb.com/api_token.php?command=request',
      );
      const data = await response.json();
      const { token } = data;
      localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
      console.error(error);
    }
  };
}

export function fetchData() {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&token=${token}`,
      );
      const data = await response.json();
      const { results } = data;
      dispatch(getData(results));
    } catch (error) {
      console.error(error);
    }
  };
}
