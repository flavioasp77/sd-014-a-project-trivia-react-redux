export const GET_PLAYER = 'GET_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';

export const GET_RANKING = 'GET_RANKING';
export const SAVE_RANKING = 'SAVE_RANKING';
export const UPDATE_RANKING = 'UPDATE_RANKING';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';

export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

export const updatePlayer = (player) => ({
  type: UPDATE_PLAYER,
  player,
});

export const updateRanking = (player) => ({
  type: UPDATE_RANKING,
  player,
});

export const getPlayer = () => (dispatch) => {
  const state = localStorage.getItem('state');
  dispatch(updatePlayer(JSON.parse(state)));
};

export const getRanking = () => (dispatch) => {
  const ranking = localStorage.getItem('ranking');
  dispatch(updateRanking(JSON.parse(ranking)));
};

export const fetchQuestions = () => async (dispatch) => {
  const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');

  const TOKEN = await fetchToken.json();
  localStorage.setItem('token', JSON.stringify(token));

  const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${TOKEN.token}`);
  dispatch({
    type: FETCH_QUESTIONS,
    questions: JSON.parse(questions),
  });
};

export const changeSettings = (settings) => ({
  type: CHANGE_SETTINGS,
  settings,
});
