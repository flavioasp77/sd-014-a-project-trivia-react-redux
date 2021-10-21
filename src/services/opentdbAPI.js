import storage from './storage';

const OPENTDB_BASEURL = 'https://opentdb.com';
const QUESTIONS = 5;

const opentdbAPI = {
  fetchToken: async () => {
    const OPENTDB_TOKEN = `${OPENTDB_BASEURL}/api_token.php?command=request`;
    try {
      const response = await (await fetch(OPENTDB_TOKEN)).json();
      if (response.response_code !== 0) {
        throw new Error(`response_code ${response.response_code}`);
      }
      storage.write('token', response.token);
    } catch (error) {
      console.log(error);
    }
  },

  fetchQuestions: async (amount = QUESTIONS) => {
    const token = storage.read('token');
    const OPENTDB_TRIVIA = `${OPENTDB_BASEURL}/api.php?amount=${amount}&token=${token}`;
    try {
      const response = await (await fetch(OPENTDB_TRIVIA)).json();
      if (response.response_code !== 0) {
        throw new Error(`response_code ${response.response_code}`);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default opentdbAPI;
