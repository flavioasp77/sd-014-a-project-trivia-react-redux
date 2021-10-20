export function emailValidation(email) {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
}

export function loginValidation(login) {
  const MIN_LENGTH = 3;
  return login.length > MIN_LENGTH;
}
