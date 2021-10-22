export default function scoreReducer(state = 0, action) {
  switch (action.type) {
  case 'UPDATE_SCORE':
    return state + action.score;
  case 'RESET_SCORE':
    return state === 0;
  default:
    return state;
  }
}
