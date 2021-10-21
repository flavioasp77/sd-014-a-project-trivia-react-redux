const TOKEN_KEY = 'token';

const URL_GET_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = async () => {
  try {
    const response = await fetch(URL_GET_TOKEN);
    const tokenRaw = await response.json();
    const { token, response_code: code } = tokenRaw;
    if (code === 0 && response.ok) return Promise.resolve(token);
    return Promise.reject(new Error('Falha na requisição à API'));
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const saveTokenInLS = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const fetchTrivia = (token) => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json()));
