import fetchApi from '../services/triviaApi';

export const USER_INFO = 'USER_INFO';
export const QUESTIONS_INFO = 'QUESTIONS_INFO';
export const SET_TIMER = 'SET_TIMER';

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

export const questionsInfoThunk = () => async (dispatch) => {
  const response = await fetchApi();
  const data = { response };
  dispatch(questionsInfo(data));
};

export const setTimer = (timer) => ({
  type: SET_TIMER,
  payload: {
    timer,
  },
});
