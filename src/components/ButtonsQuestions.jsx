import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonsQuestions extends Component {
  render() {
    const { order, handleClickanswer, score, click, Nquestions,
      results, handleNextButton, timer } = this.props;
    return (
      <div>
        <section>
          <button
            data-testid="correct-answer"
            type="button"
            style={ { order } }
            className={ (timer === 0 || click) ? 'rightanswer' : 'answer-btn' }
            onClick={ score }
            disabled={ timer === 0 || click }
          >
            {results[Nquestions].correct_answer}
          </button>
          {
            results[Nquestions].incorrect_answers.map((question, index) => (
              <button
                key={ index }
                type="button"
                style={ { order: index } }
                data-testid={ `wrong-answer-${index}` }
                className={ (timer === 0 || click) ? 'wronganswer' : 'answer-btn' }
                onClick={ handleClickanswer }
                disabled={ timer === 0 || click }
              >
                {question}
              </button>
            ))
          }
        </section>
        <button
          type="button"
          onClick={ handleNextButton }
          className="continue-btn"
          data-testid="btn-next"
          style={ { visibility: click || timer === 0 ? 'visible'
            : 'hidden' } }
        >
          Continue
        </button>
      </div>
    );
  }
}

ButtonsQuestions.propTypes = {
  order: PropTypes.number.isRequired,
  handleClickanswer: PropTypes.func.isRequired,
  score: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
  Nquestions: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleNextButton: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default ButtonsQuestions;
