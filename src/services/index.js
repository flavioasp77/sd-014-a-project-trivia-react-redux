export async function fetchApiToken() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const response = await request.json();
  const result = await response.token;
  localStorage.setItem('token', result);
}

export async function fetchQuestions(token) {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(URL);
  const response = await request.json();
  const results = await response.results;
  return results;
}
