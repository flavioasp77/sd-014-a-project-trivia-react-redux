export function addInfo(name, email, img) {
  return {
    type: 'ADD_USER',
    img,
    email,
    name,
  };
}

export function addScore(score) {
  return {
    type: 'UPDATE_SCORE',
    score,
  };
}
