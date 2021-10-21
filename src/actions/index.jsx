export const SET_PLAYER = 'SET_PLAYER';

export const setPlayer = (name, img) => ({
  type: SET_PLAYER,
  name,
  img,
});
