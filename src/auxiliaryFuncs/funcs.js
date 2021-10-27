export const setDifficulty = (questions, questionNumber) => {
  const difficultyValue = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  if (questions[questionNumber].difficulty === 'easy') {
    return difficultyValue.easy;
  }

  if (questions[questionNumber].difficulty === 'medium') {
    return difficultyValue.medium;
  }

  return difficultyValue.hard;
};

export const saveLocalStorage = (user) => {
  localStorage.setItem('state', JSON.stringify({ user }));
};
