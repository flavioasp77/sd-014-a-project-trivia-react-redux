const getToken = async () => {
  const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
  const resolve = await endpoint.json();
  return resolve;
};

export default getToken;
