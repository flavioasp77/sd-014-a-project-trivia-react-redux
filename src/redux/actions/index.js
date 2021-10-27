import getGravatar from '../../helpers/getGravatar';

export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const UPDATE_RANKING = 'UPDATE_RANKING';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

export const updatePlayer = (player) => (dispatch) => {
  dispatch({
    type: UPDATE_PLAYER,
    player: {
      ...player,
      pictureURL: getGravatar(player.gravatarEmail),
    },
  });
  localStorage.setItem('state', JSON.stringify({ player }));
};

export const createPlayer = (name, gravatarEmail) => (dispatch) => {
  const player = {
    name,
    gravatarEmail,
    score: 0,
    assertions: 0,
  };
  dispatch(updatePlayer(player));
};

export const updateRanking = (newPlayer) => (dispatch) => {
  const localStorageRanking = JSON.parse(localStorage.getItem('ranking'));
  const newRanking = [...localStorageRanking || [], newPlayer];
  dispatch({ type: UPDATE_RANKING, newRanking });
  localStorage.setItem('ranking', JSON.stringify(newRanking));
};

export const fetchQuestions = () => (
  async (dispatch, getState) => {
    const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const TOKEN = await fetchToken.json();
    localStorage.setItem('token', JSON.stringify(TOKEN));
    const { category, difficulty, type } = getState().settings;
    console.log(category);
    const urlSettings = `&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${TOKEN.token}${urlSettings}`);
    const json = await response.json();
    dispatch({
      type: FETCH_QUESTIONS,
      questions: json.results,
    });
  }
);

export const changeSettings = (settings) => ({
  type: CHANGE_SETTINGS,
  settings,
});
