export const LOGIN_USER = 'LOGIN_USER';
export const GET_DATA = 'GET_DATA';

export const loginUser = (payload) => ({ type: LOGIN_USER, payload });

export const getData = (payload) => ({ type: GET_DATA, payload });

export function fetchData(token) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&token=${token}`,
      );
      const data = await response.json();
      dispatch(getData(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function fetchGetToken() {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://opentdb.com/api_token.php?command=request',
      );
      const data = await response.json();
      const { token } = data;
      localStorage.setItem('token', JSON.stringify(token));
      dispatch(fetchData(token));
    } catch (error) {
      console.error(error);
    }
  };
}
