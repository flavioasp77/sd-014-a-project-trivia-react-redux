import React, { Component } from 'react';
import PropTypes from 'prop-types';
import htmlDecode from '../services/htmlDecode';
import '../styles/Answers.css';

class Answers extends Component {
  className(answer) {
    const { correctAnswer, showAnswer } = this.props;
    if (answer === correctAnswer) {
      return showAnswer ? 'answer correct' : 'answer';
    }
    return showAnswer ? 'answer wrong' : 'answer';
  }

  render() {
    const { answers, correctAnswer, onAnswerClick, showAnswer } = this.props;

    return (
      <div className="answers-container">
        {answers.map((answer, index) => (
          <button
            className={ this.className(answer) }
            data-testid={
              answer === correctAnswer
                ? 'correct-answer'
                : `wrong-answer-${index}`
            }
            disabled={ showAnswer }
            key={ `${answer}-${index}` }
            onClick={ onAnswerClick }
            type="button"
          >
            {htmlDecode(answer)}
          </button>
        ))}
      </div>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  onAnswerClick: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired,
};

export default Answers;
