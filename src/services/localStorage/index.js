export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function createUserLocalStorage(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

function getPlayerFromLocalStorage() {
  return JSON.parse(localStorage.getItem('state'));
}

export function sumScore(difficulty, time) {
  const TEN = 10;
  const THREE = 3;
  let weight = 0;
  switch (difficulty) {
  case 'easy':
    weight = 1;
    break;
  case 'medium':
    weight = 2;
    break;
  case 'hard':
    weight = THREE;
    break;
  default:
    break;
  }
  const points = TEN + (time * weight);
  const state = localStorage.getItem('state');
  const user = JSON.parse(state);
  const newUser = {
    player: {
      ...user.player,
      score: user.player.score += points,
      assertions: user.player.assertions += 1,
    },
  };
  createUserLocalStorage(newUser);
}

export function getRankingFromLocalStorage() {
  return JSON.parse(localStorage.getItem('ranking'));
}

export function savePlayerOnRankingLocalStorage() {
  const { player } = getPlayerFromLocalStorage();
  let ranking = getRankingFromLocalStorage();
  if (ranking) {
    const newRanking = [...ranking, player];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  } else {
    ranking = [player];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }
}
