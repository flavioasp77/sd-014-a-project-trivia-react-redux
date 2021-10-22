const generateRandomAnswers = (questions, index) => {
  const answers = questions[index].incorrect_answers;
  answers.splice(Math.floor(Math.random() * ((questions.length - 1) - 0)),
    0, questions[index].correct_answer);
  const arrayAnswers = [];
  const HARD = 3;
  answers.map((item) => {
    arrayAnswers.push({
      item,
      border: '',
      isDisabled: false,
      isCorrect: item === questions[index].correct_answer,
      difficulty: (questions[index].difficulty === 'easy' && 1)
      || (questions[index].difficulty === 'medium' && 2)
      || (questions[index].difficulty === 'hard' && HARD),
    });
    return item;
  });
  return arrayAnswers;
};

export const getArrayPlayers = () => JSON.parse(localStorage.getItem('ranking'));

export default generateRandomAnswers;
