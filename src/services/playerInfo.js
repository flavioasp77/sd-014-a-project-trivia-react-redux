export function savePlayerLocal(name = '',
  assertions = 0, score = 0, gravatarEmail = '') {
  const player = {
    name,
    assertions,
    score,
    gravatarEmail,
  };
  return localStorage.setItem('state', JSON.stringify(player));
}

export function getPlayerInfo() {
  return JSON.parse(localStorage.getItem('state'));
}
