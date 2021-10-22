// const token = localStorage.getItem('token');
const TRIVIA_BASE_API = (token) => `https://opentdb.com/api.php?amount=5&token=${token}`;
const TOKEN_BASE_API = 'https://opentdb.com/api_token.php?command=request';

const getApiTrivia = async () => {
  const token = await fetch(TOKEN_BASE_API);
  const responseToken = await token.json();
  localStorage.setItem('token', responseToken.token);
  console.log(responseToken, 'Xablau');
  const response = await fetch(TRIVIA_BASE_API(responseToken.token));
  return (
    response.ok ? Promise.resolve(response.json()) : Promise.reject(response.json()));
};

export default getApiTrivia;
