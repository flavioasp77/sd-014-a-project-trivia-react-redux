const TOKEN_BASE_API = 'https://opentdb.com/api_token.php?command=request';

const getApiToken = async () => {
  const response = await fetch(TOKEN_BASE_API);
  return (
    response.ok ? Promise.resolve(response.json()) : Promise.reject(response.json()));
};

export default getApiToken;
