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
      score: 0,
      click: false,
      assertions: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // ver https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // componentDidMount() {
  //   this.setClickedFalse();
  // }

  setClickedFalse() {
    this.setState({ click: false });
  }

  handleClick(answer) {
    const rightButton = document.querySelector('[data-testid="correct-answer"]');
    const wrongButtons = document.querySelectorAll('[data-testid*="wrong-answer"]');
    rightButton.className = CORRECT_ANSWER;
    wrongButtons.forEach((button) => { button.className = WRONG_ANSWER; });
    this.calculateScore(answer);
    this.setState({ answer });
  }

  handleClickNext(isCorrect) {
    const buttons = document.querySelectorAll('[data-testid*="-answer"]');
    buttons.forEach((button) => { button.className = 'standard-button'; });

    const { callback } = this.props;
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

  calculateScore(answer) {
    const timer = 1;
    const scoreCorrect = 10;
    const { data: { difficulty } } = this.props;

    if (answer === CORRECT_ANSWER) {
      const WEIGHTS = ['easy', 'medium', 'hard'];
      const weight = WEIGHTS.indexOf(difficulty) + 1;
      const sumPoints = scoreCorrect + (timer * weight);
      this.setState((prevState) => ({
        score: prevState.score + sumPoints,
        assertions: prevState.assertions + 1,
      }));
    }
    this.setState({ click: true });
  }

  render() {
    const { answer, click } = this.state;

    const { data: {
      category, question, correctAnswer, incorrectAnswers, options,
    } } = this.props;
    console.log(correctAnswer);
    return (
      <div>
        <div>
          <p data-testid="question-category">
            { category }
          </p>
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
          { this.showNext(answer !== NO_ANSWER) }
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};
