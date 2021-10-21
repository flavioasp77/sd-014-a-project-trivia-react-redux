import fetchAPI from '../services/fetchAPI';

export const USER_NAME = 'USER_NAME';
export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const login = (email, name) => ({ type: LOGIN, payload: { email, name } });

// export const username = (name) => ({ type: USER_NAME, name });

const getToken = (token) => ({ type: GET_TOKEN, payload: { token } });

const getQuestions = (questions) => ({ type: GET_QUESTIONS, questions });

export const getTokenThunk = () => async (dispatch) => {
  const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
  const { token } = await fetchAPI(TOKEN_URL);

  localStorage.setItem('token', token);

  dispatch(getToken(token));
};

export const getQuestionsThunk = () => async (dispatch) => {
  const token = getTokenThunk();
  const QUESTIONS_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const questions = await fetchAPI(QUESTIONS_URL);
  dispatch(getQuestions(questions));
};

// const addExpense = (expense) => ({
//   type: ADD_ACTION,
//   payload: expense,
// });

// export const addExpenseThank = (expense) => (
//   (dispatch) => getCurrency()
//     .then((data) => dispatch(addExpense({ ...expense, exchangeRates: data })))
// );
