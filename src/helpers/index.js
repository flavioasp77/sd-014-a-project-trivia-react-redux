import { MD5 } from 'crypto-js';

const generateRandomAnswers = (questions, index) => {
  const answers = questions[index].incorrect_answers;
  answers.splice(Math.floor(Math.random() * ((questions.length - 1))),
    0, questions[index].correct_answer);
  const HARD = 3;
  const arrayAnswers = answers.map((item) => ({
    item,
    border: '',
    isDisabled: false,
    isCorrect: item === questions[index].correct_answer,
    difficulty: (questions[index].difficulty === 'easy' && 1)
      || (questions[index].difficulty === 'medium' && 2)
      || (questions[index].difficulty === 'hard' && HARD),
  }));
  return arrayAnswers;
};

export const getArrayPlayers = () => JSON.parse(localStorage.getItem('ranking'));
export const getStatePlayer = () => JSON.parse(localStorage.getItem('state'));

const attRankingArrayFromLS = ({ player: { score, name } }) => {
  const ArrayPlayers = getArrayPlayers();
  const objPlayer = ArrayPlayers[ArrayPlayers.length - 1];
  objPlayer.score = score;
  const newArray = ArrayPlayers.map((item) => (
    name === item.name ? objPlayer : item));
  localStorage.setItem('ranking', JSON.stringify(newArray));
};

export const attPlayerfromLS = (response, timerValue) => {
  const objFromLS = getStatePlayer();
  const RIGHT_ANSWER = 10;
  const result = response.isCorrect
    ? (RIGHT_ANSWER + (Number(timerValue) * response.difficulty)) : 0;
  objFromLS.player.score += result;
  objFromLS.player.assertions += result !== 0 ? 1 : 0;
  localStorage.setItem('state', JSON.stringify(objFromLS));
  attRankingArrayFromLS(objFromLS);
};

export const setInitialPlayerOfLS = ({ name, email }) => {
  const objPlayer = { player: {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
  } };
  localStorage.setItem('state', JSON.stringify(objPlayer));
  const arrayPlayers = getArrayPlayers();
  const OBJ = {
    name: objPlayer.player.name,
    picture: `https://www.gravatar.com/avatar/${MD5(objPlayer.gravatarEmail).toString()}`,
    score: objPlayer.player.score,
  };
  if (arrayPlayers) {
    const newArray = [...arrayPlayers, OBJ];
    return localStorage.setItem('ranking', JSON.stringify(newArray));
  }
  const newArray = [];
  newArray.push(OBJ);
  return localStorage.setItem('ranking', JSON.stringify(newArray));
};

export default generateRandomAnswers;
