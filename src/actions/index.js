import { LOGIN, TOKEN_API, FALHA_TOKEN } from './actionTypes';

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
      dispatch(requisitarToken(respostaApi.token));
    } catch (error) {
      return dispatch(falhaToken);
    }
  };
}
