import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const {
      handleClick, css, order, results, questionAtual, handleNextButton } = this.props;
    return (
      <div>
        <div className="answers">
          <button
            id="correct"
            name={ results[questionAtual].difficulty }
            type="button"
            data-testid="correct-answer"
            className={ css ? 'correct' : null }
            stle={ { order } }
            onClick={ handleClick }
            disabled={ css }
          >
            { results[questionAtual].correct_answer }
          </button>
          { results[questionAtual].incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              name={ results[questionAtual].difficulty }
              id="incorrect"
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className={ css ? 'incorrect' : null }
              style={ { order: index } }
              onClick={ handleClick }
              disabled={ css }
            >
              { answer }
            </button>
          ))}
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ handleNextButton }
          style={ { order: 5 } }
          hidden={ !css }
        >
          Próxima Pergunta
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleNextButton: PropTypes.func.isRequired,
  css: PropTypes.bool.isRequired,
  questionAtual: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Button;
