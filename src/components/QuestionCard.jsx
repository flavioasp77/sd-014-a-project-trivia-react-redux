import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';
import '../styles/QuestionCard.css';
import htmlDecode from '../services/htmlDecode';

class QuestionCard extends Component {
  render() {
    const { data, nextQuestion, onAnswerClick, shouldShowAnswer, timer } = this.props;

    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrects,
      question,
    } = data;

    return (
      <div className="question-card">
        <div className="container-question-card">
          <div className="question-container">
            <p className="question-category" data-testid="question-category">
              {category}
            </p>
            <p className="question-text" data-testid="question-text">
              {htmlDecode(question)}
            </p>
          </div>
          <span className="timer">{`Tempo: ${timer}`}</span>
        </div>
        <div className="container-question-card">
          <Answers
            answers={ [...incorrects, correct] }
            correctAnswer={ correct }
            onAnswerClick={ onAnswerClick }
            showAnswer={ shouldShowAnswer || timer === 0 }
          />
          {(shouldShowAnswer || timer === 0) && (
            <button
              className="btn-next"
              data-testid="btn-next"
              onClick={ nextQuestion }
              type="button"
            >
              PRÓXIMA
            </button>
          )}
        </div>
      </div>
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
  onAnswerClick: PropTypes.func.isRequired,
  shouldShowAnswer: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

export default QuestionCard;
