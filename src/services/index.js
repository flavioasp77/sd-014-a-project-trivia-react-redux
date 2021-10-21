const TOKEN_KEY = 'token';

export const fetchToken = async () => {
  try {
    const tokenRaw = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token, response_code: code } = tokenRaw;
    if (code === 0 && tokenRaw.ok) return Promise.resolve(token);
    return Promise.reject(new Error('Falha na requisição à API'));
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const saveTokenInLS = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
