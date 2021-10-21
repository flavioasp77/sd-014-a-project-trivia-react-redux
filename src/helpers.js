const generateRandomAnswers = (questions, index) => {
  const answers = questions[index].incorrect_answers;
  answers.splice(Math.floor(Math.random() * ((questions.length - 1) - 0)),
    0, questions[index].correct_answer);
  const arrayAnswers = [];
  answers.map((item) => {
    arrayAnswers.push({
      item,
      border: '',
      isDisabled: false,
      isCorrect: item === questions[index].correct_answer,
    });
    return item;
  });
  return arrayAnswers;
};

export default generateRandomAnswers;
