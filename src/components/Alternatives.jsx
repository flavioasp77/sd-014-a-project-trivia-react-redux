import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonNext from './ButtonNext';

export default class Alternatives extends Component {
  render() {
    const { options, isClick, disabled, handleCorrect,
      handleIncorrect, handleButtonNext } = this.props;
    return (
      <div className="options-container">
        <button
          type="button"
          data-testid="correct-answer"
          className={ `btn btn-outline-secondary ${(isClick && 'correct-answer')
      || null}` }
          onClick={ handleCorrect }
          disabled={ disabled }
        >
          { options.correct_answer }
        </button>
        { options.incorrect_answers.map((question, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            className={ `btn btn-outline-secondary ${(isClick && 'incorrect-answers')
        || null}` }
            onClick={ handleIncorrect }
            disabled={ disabled }
          >
            { question }
          </button>
        ))}
        <div className="next-btn-container">
          { isClick && <ButtonNext onClick={ handleButtonNext } /> }
        </div>
      </div>
    );
  }
}

Alternatives.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleButtonNext: PropTypes.func.isRequired,
  handleCorrect: PropTypes.func.isRequired,
  handleIncorrect: PropTypes.func.isRequired,
  isClick: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
