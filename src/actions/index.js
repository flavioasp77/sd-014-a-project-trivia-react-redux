import md5 from 'crypto-js/md5';

export const ADD_USER = 'ADD_USER';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
  generateHash: md5(payload.email).toString(),
});
