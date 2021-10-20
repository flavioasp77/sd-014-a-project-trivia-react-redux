export default async function getTriviaToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  return localStorage.setItem('token', response.json().token);
}
