export const triviaEndpoint = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  const result = await fetch(triviaEndpoint);
  const resultJson = await result.json();
  return resultJson;
};
