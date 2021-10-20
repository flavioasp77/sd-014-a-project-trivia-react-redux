export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';

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
    console.log(token);
    console.log(response);
    dispatch(requestTrivia(response.results));
  };
}
