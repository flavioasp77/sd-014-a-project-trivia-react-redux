const useTokenURL = 'https://opentdb.com/api.php?amount=5&token=';
const getTokenURL = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => (await fetch(getTokenURL)).json();
export const useToken = async (token) => (await fetch(useTokenURL + token)).json();
