const token = localStorage.getItem('token');
const TRIVIA_BASE_API = `https://opentdb.com/api.php?amount=5&token=${token}`;

const getApiTrivia = async () => {
  const response = await fetch(TRIVIA_BASE_API);
  return (
    response.ok ? Promise.resolve(response.json()) : Promise.reject(response.json()));
};

export default getApiTrivia;
