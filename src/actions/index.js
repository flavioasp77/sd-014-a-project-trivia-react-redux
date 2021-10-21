export const USER_INFO = 'USER_INFO';
export const QUESTIONS_INFO = 'QUESTIONS_INFO';

export const userInfo = (user, email) => ({
  type: USER_INFO,
  payload: {
    user,
    email,
  },
});

export const questionsInfo = (questions) => ({ type: 'GET_CURR', data: questions });

export const fetchApi = async () => {
  // Puxa o token do localStorage
  const token = localStorage.getItem('token');
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await request.json();
  return response.results;
};
// export const questionsInfo = (response) => ({
//   type: QUESTIONS_INFO,
//   payload: {
//     response,
//   },
// });

// export const questionsInfoThunk = () => async (dispatch) => {
//   const response = await fetchApi();
//   const data = { response };
//   dispatch(questionsInfo(data));
// };
