import { MD5 } from 'crypto-js';

const gravatarAPI = {
  convertEmail: (userEmail) => MD5(userEmail).toString(),

  fetchUserImage: async (hashEmail) => {
    const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
    const response = await fetch(URL);
    if (response.ok) {
      return response.url;
    }
  },
};

export default gravatarAPI;
