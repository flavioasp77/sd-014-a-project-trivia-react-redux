import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends Component {
  constructor() {
    super();
    this.answerButtons = this.answerButtons.bind(this);
  }

  answerButtons(question) {
    const { game: { answers }, handleResponse } = this.props;
    return answers.map((answer, i) => {
      if (answer.item === question.correct_answer) {
        return (
          <li key={ i }>
            <button
              value={ i }
              type="button"
              data-testid="correct-answer"
              disabled={ answer.isDisabled }
              onClick={ handleResponse }
              style={ { border: answer.border } }
            >
              {answer.item}
            </button>
          </li>);
      }

      return (
        <li key={ i }>
          <button
            type="button"
            data-testid={ `wrong-answer-${i}` }
            value={ i }
            disabled={ answer.isDisabled }
            onClick={ handleResponse }
            style={ { border: answer.border } }
          >
            {answer.item}
          </button>
        </li>
      );
    });
  }

  render() {
    const { game: { questions, index, nextQuestionBtn },
      handleNextQuestion } = this.props;
    const question = questions[index];
    return (
      <section>
        <h3 data-testid="question-category">
          {question.category}
        </h3>
        <p data-testid="question-text">
          {question.question}
        </p>
        <div id="answers">
          <ul>
            {this.answerButtons(question)}
          </ul>
        </div>
        {nextQuestionBtn
        && (
          <button
            onClick={ handleNextQuestion }
            type="button"
            data-testid="btn-next"
          >
            Próxima
          </button>)}
      </section>
    );
  }
}

Question.propTypes = {
  game: PropTypes.objectOf(PropTypes.any).isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleResponse: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game }) => ({
  game,
});

export default connect(mapStateToProps, null)(Question);
