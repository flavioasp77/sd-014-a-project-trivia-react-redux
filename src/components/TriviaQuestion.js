import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/TriviaQuestion.style.css';
import { getStateFromStorage, savePlayerScore } from '../services/localStorage';
import { sumScore, sumAssertions } from '../services/functions';

const correct = 'correct-answer';

export default class TriviaQuestion extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { delayToResponse } = this.props;
    delayToResponse();
  }

  componentDidUpdate(prevProps) {
    const { stateActual: { idInterval }, resetTimer } = this.props;
    const MIN_SECONDS = 1;
    if (prevProps.stateActual.timer === MIN_SECONDS) {
      resetTimer();
      clearInterval(idInterval);
    }
  }

  questionRender() {
    const { question } = this.props;
    return (
      <div className="div-question">
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text">{ question.question }</p>
        <div className="div-alternative-buttons">
          {this.mapAlternatives()}
        </div>
      </div>);
  }

  handleClick({ target: { id } }) {
    const { stateActual: { idInterval, timer } } = this.props;
    const { question: { difficulty } } = this.props;
    // const FIVE_SECONDS = 5000;
    clearInterval(idInterval);
    console.log(id);
    const stateActual = getStateFromStorage();
    stateActual.player.score += sumScore(id, timer, difficulty);
    stateActual.player.assertions += sumAssertions(id);
    savePlayerScore(stateActual.player);
  }

  mapAlternatives() {
    const { question, handleClickQuestion, stateActual: {
      alternativesShuffled,
      className,
      timeDisableButton } } = this.props;
    let wrongIndex = 0;
    return alternativesShuffled.map((alternative, index) => {
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
            handleClickQuestion();
            this.handleClick(event);
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
    const { stateActual: { timer } } = this.props;
    // console.log(question);
    return (
      <div className="div-question-and-timer">
        {question !== undefined && this.questionRender()}
        <h3 className="timer">{`Timer: ${timer}`}</h3>
      </div>
    );
  }
}

TriviaQuestion.propTypes = {
  question: PropTypes.arrayOf(PropTypes.any).isRequired,
  stateActual: PropTypes.shape({
    alternativesShuffled: PropTypes.arrayOf(PropTypes.any),
    visibleButton: PropTypes.bool,
    className: PropTypes.bool,
    timer: PropTypes.number,
    timeDisableButton: PropTypes.bool,
    idInterval: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  handleClickQuestion: PropTypes.func.isRequired,
  delayToResponse: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};
