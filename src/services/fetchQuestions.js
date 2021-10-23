const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const fetchQuestions = async () => {
  try {
    const responseToken = await fetch(URL_TOKEN);
    const jsonToken = await responseToken.json();
    const { token } = jsonToken;

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

export default fetchQuestions;
