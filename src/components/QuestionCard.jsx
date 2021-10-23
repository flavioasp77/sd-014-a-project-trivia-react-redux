import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import '../styles/QuestionCard.css';

const NO_ANSWER = '';
const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

export default class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: NO_ANSWER,
      timer: 30,
      click: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.selectedClickFalse = this.selectedClickFalse(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.handleTimer();
  }

  resetTimer() {
    this.setState({ timer: 30 });
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  stopTimer() {
    const { timer } = this.state;
    const ZERO = 0;
    if (timer === ZERO) {
      clearInterval(this.interval);
      this.setState({ click: true });
      this.showNext();
    }
  }

  selectedClickFalse() {
    this.setState({ click: false });
  }

  // ver https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array ***
  handleClick(answer) {
    this.pauseTimer();
    const rightButton = document.querySelector('[data-testid="correct-answer"]');
    const wrongButtons = document.querySelectorAll('[data-testid*="wrong-answer"]');
    rightButton.className = CORRECT_ANSWER;
    wrongButtons.forEach((button) => { button.className = WRONG_ANSWER; });

    this.setState({ answer });
  }

  handleClickNext(isCorrect) {
    const buttons = document.querySelectorAll('[data-testid*="-answer"]');
    buttons.forEach((button) => { button.className = 'standard-button'; });

    const { callback } = this.props;
    this.resetTimer();
    this.handleTimer();
    this.setState({ answer: NO_ANSWER, click: false });
    callback(isCorrect);
  }

  showNext(show) {
    const { answer } = this.state;
    return show && (
      <Button
        onClick={ () => this.handleClickNext(answer === CORRECT_ANSWER) }
        submit={ false }
        testid="btn-next"
        value="Próxima"
      />
    );
  }

  handleTimer() {
    const SECOND = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      this.stopTimer();
    }, SECOND);
  }

  render() {
    const { answer, timer, click } = this.state;
    const { data: {
      category, question, correctAnswer, incorrectAnswers, options,
    } } = this.props;

    return (
      <div>
        <div>
          <p data-testid="question-category">
            { category }
          </p>
          <p>{ timer }</p>
          <p data-testid="question-text">
            { question }
          </p>
        </div>
        <div>
          { options.map((option, index) => {
            const isCorrect = option === correctAnswer;
            return (<Button
              key={ index }
              onClick={ () => this.handleClick(
                isCorrect ? CORRECT_ANSWER : WRONG_ANSWER,
              ) }
              submit={ false }
              testid={
                isCorrect
                  ? CORRECT_ANSWER
                  : `wrong-answer-${incorrectAnswers.indexOf(option)}`
              }
              value={ option }
              disabled={ click }
            />);
          }) }
        </div>
        <div>
          { this.showNext(answer !== NO_ANSWER || timer === 0) }
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};
