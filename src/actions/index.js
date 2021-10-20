export const LOGIN_CASE = 'LOGIN_CASE';

export function loginAction(data) {
  return {
    type: LOGIN_CASE,
    payload: data,
  };
}
