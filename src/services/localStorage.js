export const saveToken = (token) => localStorage.setItem('token', token);

export const getLocalToken = () => localStorage.getItem('token');

export const savePlayerEmail = (gravatarEmail, name, score = 0) => {
  const player = {
    player: {
      name,
      assertions: 0,
      score,
      gravatarEmail,
    },
  };
  localStorage.setItem('state', JSON.stringify(player));
};

export const getStateFromStorage = () => JSON.parse(localStorage.getItem('state'));

export const getRankFromStorage = () => JSON.parse(localStorage.getItem('ranking'));

export const savePlayerScore = (player) => {
  const playerFuture = {
    player,
  };
  localStorage.setItem('state', JSON.stringify(playerFuture));
};
