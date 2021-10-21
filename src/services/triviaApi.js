const fetchApi = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await request.json();
  return response.results;
};

export default fetchApi;
