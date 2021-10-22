import { MD5 } from 'crypto-js';

const generateRandomAnswers = (questions) => {
  const answers = questions.incorrect_answers;
  answers.splice(Math.floor(Math.random() * ((questions.length - 1) - 0)),
    0, questions.correct_answer);
  const arrayAnswers = [];
  const HARD = 3;
  answers.map((item) => {
    arrayAnswers.push({
      item,
      border: '',
      isDisabled: false,
      isCorrect: item === questions.correct_answer,
      difficulty: (questions.difficulty === 'easy' && 1)
      || (questions.difficulty === 'medium' && 2)
      || (questions.difficulty === 'hard' && HARD),
    });
    return item;
  });
  return arrayAnswers;
};

export const getArrayPlayers = () => JSON.parse(localStorage.getItem('ranking'));
export const getStatePlayer = () => JSON.parse(localStorage.getItem('state'));

export const attPlayerfromLS = (response, timerValue) => {
  const objFromLS = JSON.parse(localStorage.getItem('state'));
  const RIGHT_ANSWER = 10;
  const result = response.isCorrect
    ? (RIGHT_ANSWER + (Number(timerValue) * response.difficulty)) : 0;
  objFromLS.player.score += result;
  objFromLS.player.assertions += result !== 0 ? 1 : 0;
  localStorage.setItem('state', JSON.stringify(objFromLS));
  return objFromLS;
};

export const setInitialStateLS = (obj) => {
  const arrayPlayers = getArrayPlayers();
  const OBJ = {
    name: obj.player.name,
    picture: `https://www.gravatar.com/avatar/${MD5(obj.gravatarEmail).toString()}`,
    score: obj.player.score,
  };
  if (arrayPlayers) {
    const newArray = [...arrayPlayers, OBJ];
    localStorage.setItem('ranking', JSON.stringify(newArray));
  } else {
    const newArray = [];
    newArray.push(OBJ);
    localStorage.setItem('ranking', JSON.stringify(newArray));
  }
};

export default generateRandomAnswers;
