const getToken = async () => {
  const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
  const resolve = await endpoint.json();
  return resolve;
};

export const getQuestions = async () => {
  const token = localStorage.getItem('token');
  const endpoint = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const resolve = await endpoint.json();
  return resolve;
};

export default getToken;
