const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';

  try {
    const response = await fetch(URL);
    const json = await response.json();
    const { token } = json;

    localStorage.setItem('token', token);

    return token;
  } catch (error) {
    console.error(error);
  }
};

export default fetchToken;
