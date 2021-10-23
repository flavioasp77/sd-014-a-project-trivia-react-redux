import fetchGravatar from '../../services/fetchGravatar';
import fetchToken from '../../services/fetchToken';
import fetchQuestions from '../../services/fetchQuestions';

export const SAVE_USERINFO = 'SAVE_USERINFO';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const LOADING = 'LOADING';

export const apiRequestAction = () => ({ type: LOADING });

export const saveUserInfoAction = (localState) => async (dispatch) => {
  const { name, assertions, score, gravatarEmail } = localState;
  const token = await fetchToken();
  const thumbnail = fetchGravatar(gravatarEmail);

  const payload = {
    name,
    assertions,
    score,
    gravatarEmail,
    thumbnail,
    token,
  };

  dispatch({
    type: SAVE_USERINFO,
    payload,
  });
};

export const fetchQuestionsAction = () => async (dispatch) => {
  try {
    dispatch(apiRequestAction());

    const questions = await fetchQuestions();
    const payload = await questions.results;

    dispatch({
      type: FETCH_QUESTIONS,
      payload,
    });
    return payload;
  } catch (error) {
    console.error(error);
  }
};
