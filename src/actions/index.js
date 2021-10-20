import { LOGIN, REQUEST } from './actionType';

export const login = (payload) => ({
  type: LOGIN, payload,
});

export const requestToken = (payload) => ({
  type: REQUEST, payload,
});
