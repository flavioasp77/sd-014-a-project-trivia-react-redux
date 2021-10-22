import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Btn extends Component {
  render() {
    const {
      handleClick, isClicked,
      order, results,
      atualQuestion, handleNextBtn } = this.props;
    return (
      <div>
        <div className="div-answers">
          <button
            id="correct"
            name={ results[atualQuestion].difficulty }
            type="button"
            data-testid="correct-answer"
            className={ isClicked ? 'correct' : null }
            style={ { order } }
            onClick={ handleClick }
            disabled={ isClicked }
          >
            { results[atualQuestion].correct_answer }
          </button>
          { results[atualQuestion].incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              name={ results[atualQuestion].difficulty }
              id="incorrect"
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className={ isClicked ? 'incorrect' : null }
              style={ { order: index } }
              onClick={ handleClick }
              disabled={ isClicked }
            >
              { answer }
            </button>
          ))}
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ handleNextBtn }
          style={ { order: 5 } }
          hidden={ !isClicked }
        >
          Próxima
        </button>
      </div>
    );
  }
}

Btn.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleNextBtn: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  atualQuestion: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Btn;
