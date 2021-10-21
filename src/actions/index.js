import { LOGIN, REQUEST, QUESTION } from './actionType';

export const login = (payload) => ({
  type: LOGIN, payload,
});

export const requestToken = (payload) => ({
  type: REQUEST, payload,
});

export const requestQuestions = (payload) => ({ type: QUESTION, payload });

export function questAPI() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((request) => request.json())
      .then((data) => dispatch(requestQuestions(data.results)));
  };
}
