export const saveToken = (token) => localStorage.setItem('token', token);
export const getLocalToken = () => localStorage.getItem('token');
export const savePlayerEmail = (gravatarEmail, name) => {
  const player = {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    },
  };
  localStorage.setItem('state', JSON.stringify(player));
};
export const getStateFromStorage = () => JSON.parse(localStorage.getItem('state'));
