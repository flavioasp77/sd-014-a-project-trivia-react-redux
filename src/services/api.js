export default async function fetchAPI() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const response = await request.json();
  const result = await response.token;
  localStorage.setItem('token', result);
}
