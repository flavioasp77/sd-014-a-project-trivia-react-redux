export const LOGIN_CASE = 'LOGIN_CASE';
export const QUESTIONS_CASE = 'QUESTIONS_CASE';

export function loginAction(data) {
  return {
    type: LOGIN_CASE,
    payload: data,
  };
}

export function questionsAction(data) {
  return {
    type: QUESTIONS_CASE,
    payload: data,
  };
}
