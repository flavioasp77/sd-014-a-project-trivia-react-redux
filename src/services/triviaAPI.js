export default async function getTriviaToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  return localStorage.setItem('token', JSON.stringify(response.json().token));
}
