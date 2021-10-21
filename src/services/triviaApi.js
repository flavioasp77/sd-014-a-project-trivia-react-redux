import { questionsInfo } from '../actions/index';

function fetchApi() {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    dispatch(questionsInfo());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((request) => request.json())
      .then((questions) => dispatch(questionsInfo(questions)));
  };
}

export default fetchApi;
