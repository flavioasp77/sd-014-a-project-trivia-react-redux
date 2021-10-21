import { MD5 } from 'crypto-js';

export function emailValidation(email) {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
}

export function loginValidation(login) {
  const MIN_LENGTH = 3;
  return login.length > MIN_LENGTH;
}

function tokenToStorage(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

export function userToStorage(name, email) {
  localStorage.setItem('state', JSON.stringify({
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  }));
}

export async function getTriviaToken() {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await request.json();
  const { token } = response;
  tokenToStorage(token);
  return token;
}

export async function fetchTriviaQuestions(token) {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await request.json();
  console.log(response);
  return response.results;
}

export function fetchGravatar(email) {
  const hash = MD5(email).toString();
  const img = `https://www.gravatar.com/avatar/${hash}`;
  return img;
}

// https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
export function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

export const ONE_SECOND = 1000;
