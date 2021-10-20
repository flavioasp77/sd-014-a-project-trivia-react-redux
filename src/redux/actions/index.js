export const USER_INFO = 'USER_INFO';

export function saveUserInfo(payload) {
  return {
    type: USER_INFO,
    payload,
  };
}
