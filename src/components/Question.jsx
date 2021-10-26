import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import '../styles/questions.css';

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
      handleNextQuestion, questionTimer: { timerIsOn, timerValue } } = this.props;
    const question = questions[index];
    return (
      <div className="background">
        <section className="containner-section-question">
          <div className="card-question">
            { timerIsOn ? <Timer />
              : (
                <div className="circular">
                  <div className="inner" />
                  <div className="outer" />
                  <div className="numb">
                    {timerValue}
                  </div>
                  <div
                    className="circle"
                    style={ { backgroundColor: '#273746' } }
                  />
                </div>
              )}
            <h3 data-testid="question-category">
              {question.category}
            </h3>
            <p data-testid="question-text">
              {question.question}
            </p>
          </div>
          <div className="card-options" id="answers">
            <ul>
              {this.answerButtons(question)}
            </ul>
          </div>
        </section>
        {nextQuestionBtn
        && (
          <button
            className="btn-next"
            onClick={ handleNextQuestion }
            type="button"
            data-testid="btn-next"
          >
            Próxima
          </button>)}
      </div>
    );
  }
}

Question.propTypes = {
  game: PropTypes.objectOf(PropTypes.any).isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleResponse: PropTypes.func.isRequired,
  questionTimer: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ game, questionTimer }) => ({
  game,
  questionTimer,
});

export default connect(mapStateToProps, null)(Question);
