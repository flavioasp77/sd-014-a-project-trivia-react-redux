export async function getTriviaToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();
  localStorage.setItem('token', JSON.stringify(json.token));
}

export async function getQuestions() {
  const apiToken = JSON.parse(localStorage.getItem('token'));
  const apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${apiToken}`);
  const returnedQuestions = await apiQuestions.json();
  return returnedQuestions;
}

export const getStorage = () => JSON.parse(localStorage.state);
