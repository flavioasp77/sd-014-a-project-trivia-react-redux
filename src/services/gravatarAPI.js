import md5 from 'crypto-js';

const gravatarAPI = {
  convertEmail: (userEmail) => md5(userEmail).toString(),

  fetchUserImage: async (hashEmail) => {
    const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
    const response = await fetch(URL);
    if (response.ok) {
      return response;
    }
  },
};

export default gravatarAPI;
