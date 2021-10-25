import { LOGIN, TOKEN_API, FALHA_TOKEN, QUESTIONS } from './actionTypes';

const URL = 'https://opentdb.com/api_token.php?command=request';

export const login = (email, name) => ({
  type: LOGIN,
  name,
  email,
});

function requisitarToken(payload) {
  return {
    type: TOKEN_API,
    payload,
  };
}

function falhaToken(payload) {
  return {
    type: FALHA_TOKEN,
    payload,
  };
}

export function fetchApiTrivia() {
  return async (dispatch) => {
    try {
      const resposta = await fetch(URL);
      const respostaApi = await resposta.json();
      localStorage.setItem('token', respostaApi.token);
      dispatch(requisitarToken(respostaApi.token));
    } catch (error) {
      return dispatch(falhaToken);
    }
  };
}

export const generateQuestions = (payload) => ({
  type: QUESTIONS,
  payload,
});

export const fetchQuestions = async (dispatch) => {
  const localToken = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
  const { results } = await response.json();
  dispatch(generateQuestions(results));
};
