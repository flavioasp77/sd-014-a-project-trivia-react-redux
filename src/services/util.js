export function writeLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function readLocalStorage(key) {
  const response = JSON.parse(localStorage.getItem(key));
  return response;
}

export function updateLocalStorage(name, attr) {
  const state = readLocalStorage('state');
  const { player } = state;
  const newState = {
    player: {
      ...player,
      [name]: attr,
    },

  };
  writeLocalStorage('state', newState);
}
