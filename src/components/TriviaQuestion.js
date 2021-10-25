import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/TriviaQuestion.style.css';
import { getStateFromStorage, savePlayerScore } from '../services/localStorage';

const correct = 'correct-answer';

export default class TriviaQuestion extends Component {
  constructor() {
    super();
    this.state = {
      // estados do timer
      timer: 30,
      timeDisableButton: false,
      idInterval: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setIntervalFunction = this.setIntervalFunction.bind(this);
    this.delayToResponse = this.delayToResponse.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  componentDidMount() {
    this.delayToResponse();
  }

  componentDidUpdate(prevProps, prevState) {
    const { idInterval } = this.state;
    const MIN_SECONDS = 1;

    if (prevState.timer === MIN_SECONDS) {
      this.resetTimer();
      clearInterval(idInterval);
    }
  }

  // função para gerar o tempo
  setIntervalFunction() {
    const TIME_INTERVAL = 1000;
    const idSetInterval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1, idInterval: idSetInterval }));
    }, TIME_INTERVAL);
  }

  delayToResponse() {
    const TIMEOUT = 5000;
    this.setState({ timeDisableButton: true });
    setTimeout(() => {
      this.setIntervalFunction();
      this.setState({ timeDisableButton: false });
    }, TIMEOUT);
  }

  // reset do timer
  resetTimer() {
    this.setState({ timer: 0, timeDisableButton: true });
  }

  questionRender() {
    const { question } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text">{ question.question }</p>
        <div>
          {this.mapAlternatives()}
        </div>
      </div>);
  }

  handleClick({ target: { id } }) {
    const { idInterval } = this.state;
    clearInterval(idInterval);
    console.log(id);
    const stateActual = getStateFromStorage();
    stateActual.player.score = this.sumScore(id);
    stateActual.player.assertions += this.sumAssertions(id);
    savePlayerScore(stateActual.player);
  }

  sumAssertions(id) {
    if (id === correct) {
      return 1;
    }
    return 0;
  }

  sumScore(id) {
    const { question: { difficulty } } = this.props;
    const { timer } = this.state;
    const ten = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const incorrect = 0;
    // const correct = 'correct-answer';
    if (id === correct) {
      switch (difficulty) {
      case 'easy':
        return ten + (timer * easy);
      case 'medium':
        return ten + (timer * medium);
      case 'hard':
        return ten + (timer * hard);
      default:
        break;
      }
    }
    return incorrect;
  }

  mapAlternatives() {
    const { question, scrambledQuestions, className, handleClickQuestion } = this.props;
    const { timeDisableButton } = this.state;
    let wrongIndex = 0;
    return scrambledQuestions.map((alternative, index) => {
      const correctOrWrong = alternative === question.correct_answer;
      // const correct = 'correct-answer';
      const wrong = `wrong-answer-${wrongIndex}`;
      const button = (
        <button
          key={ index }
          type="button"
          data-testid={ correctOrWrong ? correct : wrong }
          className={ className && `button-${correctOrWrong ? 'wrong' : 'correct'}` }
          onClick={ (event) => {
            this.handleClick(event);
            handleClickQuestion();
          } }
          disabled={ timeDisableButton }
          id={ correctOrWrong ? correct : wrong }
        >
          { alternative }
        </button>);
      if (alternative !== question.correct_answer) {
        wrongIndex += 1;
      }
      return button;
    });
  }

  render() {
    const { question } = this.props;
    const { timer } = this.state;
    // console.log(question);
    return (
      <div>
        {question !== undefined && this.questionRender()}
        <h3>{`Timer: ${timer}`}</h3>
      </div>
    );
  }
}

TriviaQuestion.propTypes = {
  question: PropTypes.arrayOf(PropTypes.any).isRequired,
  scrambledQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.bool.isRequired,
  handleClickQuestion: PropTypes.func.isRequired,
};
