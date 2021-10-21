import md5 from 'crypto-js/md5';

export function savePlayerLocal(name = '',
  assertions = 0, score = 0, gravatarEmail = '') {
  const state = {
    player: {
      name,
      assertions,
      score,
      gravatarEmail,
    },
  };
  return localStorage.setItem('state', JSON.stringify(state));
}

export function getPlayerInfo() {
  return JSON.parse(localStorage.getItem('state'));
}

export function getGravatarPicture(email) {
  return `https://www.gravatar.com/avatar/${md5(email).toString()}`;
}
