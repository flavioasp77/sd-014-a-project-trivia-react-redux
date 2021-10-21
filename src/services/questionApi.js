// const endpoint = 'https://opentdb.com/api.php?amount=5&token=${token}';

const questionApi = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  const sucesso = response.ok ? Promise.resolve(json) : Promise.reject(json);
  return sucesso;
};

export default questionApi;
