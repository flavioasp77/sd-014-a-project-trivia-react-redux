export default async function getToken() {
  const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonFetch = await fetchAPI.json();
  return jsonFetch.token;
}
