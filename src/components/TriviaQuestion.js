import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/TriviaQuestion.style.css';

export default class TriviaQuestion extends Component {
  constructor() {
    super();
    this.state = {
      className: false,
      // estados do timer
      timer: 30,
      timeDisableButton: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setIntervalFunction = this.setIntervalFunction.bind(this);
  }

  componentDidMount() {
    const TIMEOUT = 5000;
    setTimeout(() => {
      this.setIntervalFunction();
    }, TIMEOUT);
  }

  componentDidUpdate(prevProps, prevState) {
    const MIN_SECONDS = 0;
    if (prevState.timer === MIN_SECONDS) {
      this.resetTimer();
    }
  }

  // função para gerar o tempo
  setIntervalFunction() {
    const TIME_INTERVAL = 1000;

    setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, TIME_INTERVAL);
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

  handleClick() {
    this.setState({ className: true });
  }

  mapAlternatives() {
    const { question, scrambledQuestions } = this.props;
    const { className, timeDisableButton } = this.state;
    let wrongIndex = 0;
    return scrambledQuestions.map((alternative, index) => {
      const correctOrWrong = alternative === question.correct_answer;
      const correct = 'correct-answer';
      const wrong = `wrong-answer-${wrongIndex}`;
      const button = (
        <button
          key={ index }
          type="button"
          data-testid={ correctOrWrong ? correct : wrong }
          className={ className && `button-${correctOrWrong ? 'wrong' : 'correct'}` }
          onClick={ this.handleClick }
          disabled={ timeDisableButton }
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
};
