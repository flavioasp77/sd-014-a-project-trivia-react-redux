import md5 from 'crypto-js/md5';

export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';
export const ADD_USER = 'ADD_USER';
export const TIMER_ACTION = 'TIMER_ACTION';

const requestTrivia = (payload) => ({
  type: REQUEST_TRIVIA,
  payload,
});

// export async function getQuests(token, dispatch) {
//   const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//   console.log(response);
//   dispatch(requestTrivia());
// }

export function getToken(token) {
  return async (dispatch) => {
    const response = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
    dispatch(requestTrivia(response.results));
  };
}
export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
  generateHash: md5(payload.email).toString(),
});

export const timerAction = (timer) => ({
  type: TIMER_ACTION,
  timer,
});
