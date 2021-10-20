const END_POINT = 'https://opentdb.com/api_token.php?command=request';

const saveToken = async (token) => localStorage.setItem('token', JSON.stringify(token));

const fetchTokenApi = async () => {
  const request = await fetch(END_POINT);
  const response = await request.json();
  saveToken(response.token);
};

export default fetchTokenApi;
