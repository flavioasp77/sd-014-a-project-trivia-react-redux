import React from 'react';
import PropTypes from 'prop-types';

class Buttons extends React.Component {
  render() {
    const { order, timer, handleClickAnswer,
      click, questionResults, atualQuestion, handleNextBtn } = this.props;
    return (
      <div>
        <section className="section-answers">
          <button
            type="button"
            data-testid="correct-answer"
            style={ { order } }
            className={ (timer === 0 || click) && 'rightanswer' }
            onClick={ handleClickAnswer }
            disabled={ timer === 0 || click }
          >
            {questionResults.response[atualQuestion].correct_answer}
          </button>
          {
            questionResults
              .response[atualQuestion].incorrect_answers.map((question, index) => (
                <button
                  key={ index }
                  type="button"
                  style={ { order: index } }
                  data-testid={ `wrong-answer-${index}` }
                  className={ (timer === 0 || click) && 'wronganswer' }
                  onClick={ handleClickAnswer }
                  disabled={ timer === 0 || click }
                >
                  {question}
                </button>
              ))
          }
        </section>
        <button
          type="button"
          onClick={ handleNextBtn }
          data-testid="btn-next"
          style={ { visibility: click ? 'visible' : 'hidden' } }
        >
          Continue
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  order: PropTypes.number.isRequired,
  handleClickAnswer: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  questionResults: PropTypes.arrayOf(PropTypes.any).isRequired,
  atualQuestion: PropTypes.number.isRequired,
  handleNextBtn: PropTypes.func.isRequired,
};

export default Buttons;
