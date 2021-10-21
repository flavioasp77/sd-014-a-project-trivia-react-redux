const getToken = async () => {
  const TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(TOKEN);
  const data = response.json();
  return data;
};

module.exports = {
  getToken,
};
