export const GET_TOKEN = 'GET_TOKEN';
export const USER = 'USER';
export const QUESTIONS = 'QUESTIONS';
export const SCORE_COUNT = 'SCORE_COUNT';
export const TIMER_COUNT = 'TIMER_COUNT';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const user = (username, email) => ({
  type: USER,
  payload: {
    username,
    email,
  },
});

export const questions = (results) => ({
  type: QUESTIONS,
  results,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const scores = (score) => ({
  type: SCORE_COUNT,
  score,
});

export const timerCount = (timer) => ({
  type: TIMER_COUNT,
  payload: {
    timer,
  },
});

export const tokenApi = () => async () => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await data.json();
  const token = json;
  localStorage.setItem('token', JSON.stringify(token));
};

export const fetchApi = async () => {
  const TOKEN = JSON.parse(localStorage.getItem('token'));
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${TOKEN}`);
  const response = await request.json();
  return response.results;
};

export const questionsThunk = () => async (dispatch) => {
  const response = await fetchApi();
  const data = { response };
  dispatch(questions(data));
};
