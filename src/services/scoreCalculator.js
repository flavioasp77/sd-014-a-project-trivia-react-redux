const scoreCalculator = (answer, correctAnswer, timer, difficulty) => {
  const CORRECT_SCORE = 10;
  const HARD_SCORE = 3;
  const MEDIUM_SCORE = 2;
  const EASY_SCORE = 1;

  if (answer === correctAnswer) {
    if (difficulty === 'hard') return CORRECT_SCORE + (timer * HARD_SCORE);
    if (difficulty === 'medium') return CORRECT_SCORE + (timer * MEDIUM_SCORE);
    if (difficulty === 'easy') return CORRECT_SCORE + (timer * EASY_SCORE);
  }

  return 0;
};

export default scoreCalculator;
