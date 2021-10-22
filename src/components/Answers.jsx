import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Answers.css';

export default function Answers({
  correctAnswer,
  incorrectAnswers,
  onAnswerClick,
  showAnswer,
}) {
  return (
    <div className="answers-container">
      <button
        className={ showAnswer ? 'answer correct' : 'answer' }
        data-testid="correct-answer"
        onClick={ onAnswerClick }
        type="button"
      >
        {correctAnswer}
      </button>
      {incorrectAnswers.map((answer, index) => (
        <button
          className={ showAnswer ? 'answer wrong' : 'answer' }
          data-testid={ `wrong-answer-${index}` }
          key={ `${answer}-${index}` }
          onClick={ onAnswerClick }
          type="button"
        >
          {answer}
        </button>
      ))}
    </div>
  );
}

Answers.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerClick: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired,
};
