const getToken = async () => {
  const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
  const resolve = await endpoint.json();
  return resolve;
};

export const getQuestions = async ({ howMuch, category, difficulty, type }) => {
  const token = localStorage.getItem('token');
  const endpoint = await fetch(`https://opentdb.com/api.php?amount=${howMuch}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`);
  const resolve = await endpoint.json();
  return resolve;
};

export const getCategories = async () => {
  const endpoint = await fetch('https://opentdb.com/api_category.php');
  const resolve = await endpoint.json();
  return resolve;
};

export default getToken;
