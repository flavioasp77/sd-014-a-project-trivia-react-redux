export async function getToken() {
  const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonFetch = await fetchAPI.json();
  return jsonFetch.token;
}

export const getQuestions = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const fetchQuestions = await fetch(endPoint);
  const fetchQuestionsJson = await fetchQuestions.json();
  return fetchQuestionsJson.results;
};
