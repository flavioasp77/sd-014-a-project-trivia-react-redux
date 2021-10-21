
const fetchToken = async () => { 
  try {
  const tokenRaw = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token, response_code } = tokenRaw;
  if(response_code === 0) return token;
  return new Error('Erro! Perigo!');
  }
  catch(error) {
    return error.message
  }  
}
