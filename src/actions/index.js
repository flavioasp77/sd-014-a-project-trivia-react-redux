import fetchApi from '../services/triviaApi';

export const USER_INFO = 'USER_INFO';
export const QUESTIONS_INFO = 'QUESTIONS_INFO';
export const SCORE_INFO = 'SCORE_INFO';

export const userInfo = (user, email) => ({
  type: USER_INFO,
  payload: {
    user,
    email,
  },
});

export const questionsInfo = (response) => ({
  type: QUESTIONS_INFO,
  payload: {
    response,
  },
});

export const scoreInfo = (score) => ({
  type: SCORE_INFO,
  scoreNum: score,
});

export const questionsInfoThunk = () => async (dispatch) => {
  const response = await fetchApi();
  const data = { response };
  dispatch(questionsInfo(data));
};
