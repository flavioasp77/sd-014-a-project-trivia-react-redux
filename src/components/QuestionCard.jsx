import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  render() {
    const { data, nextQuestion, showAnswer, shouldShowAnswer } = this.props;

    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      question,
    } = data;

    return (
      <>
        <div className="question-card">
          <div className="question-container">
            <p className="question-category" data-testid="question-category">
              {category}
            </p>
            <p className="question-text" data-testid="question-text">
              {question}
            </p>
          </div>
          <Answers
            correctAnswer={ correct }
            incorrectAnswers={ incorrect }
            onAnswerClick={ shouldShowAnswer }
            showAnswer={ showAnswer }
          />
        </div>
        {showAnswer && (
          <button
            className="btn-next"
            data-testid="btn-next"
            onClick={ nextQuestion }
            type="button"
          >
            PRÓXIMA
          </button>
        )}
      </>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  shouldShowAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
