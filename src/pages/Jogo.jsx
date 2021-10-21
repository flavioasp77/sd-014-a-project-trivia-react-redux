import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import {
  handleUserAnswer as handleUserAnswerAction, setAnswers as setAnswersAction,
  setTimer,
} from '../actions/indexActions';
import generateRandomAnswers from '../helpers';

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      secondsTimer: 30,
    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.answerButtons = this.answerButtons.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const { state: { game: { questions, index } }, setAnswers } = this.props;
    setAnswers(generateRandomAnswers(questions, index));
    this.timer();
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
    const { handleUserAnswer, setTimerGlobal } = this.props;
    const { secondsTimer } = this.state;
    handleUserAnswer();
    setTimerGlobal({ value: secondsTimer, stop: true });
  }

  handleQuestions(questions, index) {
    const { state } = this.props;
    const { secondsTimer } = this.state;
    return (
      <>
        <Timer
          secondsTimer={ state.game.timer.stop ? state.game.timer.value : secondsTimer }
        />
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
      </>
    );
  }

  decrementTimer() {
    this.setState((previous) => ({
      secondsTimer: previous.secondsTimer - 1,
    }));
  }

  timer() {
    const { handleUserAnswer } = this.props;
    const ONE_SECOND = 1000;
    const timerInterval = setInterval(() => {
      const { secondsTimer } = this.state; // garante o state atualizado
      this.decrementTimer();
      if (secondsTimer === 1) {
        clearInterval(timerInterval);
        handleUserAnswer();
        // faz que a resposta seja incorreta
      }
    },
    ONE_SECOND);
    return timerInterval;
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
  setTimerGlobal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswers: (payload) => dispatch(setAnswersAction(payload)),
  handleUserAnswer: () => dispatch(handleUserAnswerAction()),
  setTimerGlobal: (payload) => dispatch(setTimer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
