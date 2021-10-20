export function fetchAPI() {
  try {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((request) => request.json())
      .then((data) => data.token);
  } catch (error) {
    console.error(error);
  }
}

export default fetchAPI;
