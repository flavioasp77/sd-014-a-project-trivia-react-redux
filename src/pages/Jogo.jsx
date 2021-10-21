import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {
  handleUserAnswer as handleUserAnswerAction, setAnswers as setAnswersAction,
} from '../actions/indexActions';
import generateRandomAnswers from '../helpers';

class Jogo extends Component {
  constructor() {
    super();
    this.handleQuestions = this.handleQuestions.bind(this);
    this.answerButtons = this.answerButtons.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentDidMount() {
    const { state: { game: { questions, index } }, setAnswers } = this.props;
    setAnswers(generateRandomAnswers(questions, index));
  }

  answerButtons(questions, index) {
    const { state: { game: { answers } } } = this.props;
    return answers.map((answer, i) => {
      if (answer.item === questions[index].correct_answer) {
        return (
          <li key={ i }>
            <button
              value={ i }
              type="button"
              data-testid="correct-answer"
              disabled={ answer.isDisabled }
              onClick={ this.handleResponse }
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
            onClick={ this.handleResponse }
            style={ { border: answer.border } }
          >
            {answer.item}
          </button>
        </li>
      );
    });
  }

  handleResponse({ target: { value } }) {
    const { handleUserAnswer } = this.props;
    const response = value;
    handleUserAnswer(response);
  }

  handleQuestions(questions, index) {
    return (
      <section>
        <h3 data-testid="question-category">
          {questions[index].category}
        </h3>
        <p data-testid="question-text">
          {questions[index].question}
        </p>
        <div id="answers">
          <ul>
            {this.answerButtons(questions, index)}
          </ul>
        </div>
      </section>
    );
  }

  render() {
    const { state: { game: { questions, index, infoIsLoaded } } } = this.props;
    return (
      <main>
        <Header />
        {infoIsLoaded && this.handleQuestions(questions, index)}
      </main>
    );
  }
}

Jogo.propTypes = {
  state: PropTypes.objectOf(PropTypes.any).isRequired,
  setAnswers: PropTypes.func.isRequired,
  handleUserAnswer: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswers: (payload) => dispatch(setAnswersAction(payload)),
  handleUserAnswer: (payload) => dispatch(handleUserAnswerAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
