export function fetchAPI() {
  try {
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((request) => request.json())
      .then((data) => data.token);
  } catch (error) {
    console.error(error);
  }
}

const requestQuestion = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await response.json();
  return results;
};

export default fetchAPI;

export { requestQuestion };
