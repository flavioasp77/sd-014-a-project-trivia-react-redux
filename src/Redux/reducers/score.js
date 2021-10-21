export default function scoreReducer(state = 0, action) {
  switch (action.type) {
  case 'UPDATE_SCORE':
    return state + action.score;
  default:
    return state;
  }
}
