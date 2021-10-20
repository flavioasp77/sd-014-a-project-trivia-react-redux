export const localSaveItem = (key, item) => (
  localStorage.setItem(key, JSON.stringify(item))
);

export const localGetItem = (key) => JSON.parse(localStorage.getItem(key));
