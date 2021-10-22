import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import '../styles/QuestionCard.css';

const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

export default class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // ver https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleClick(correct) {
    const { callback } = this.props;
    const rightButton = document.querySelector('[data-testid="correct-answer"]');
    const wrongButtons = document.querySelectorAll('[data-testid*="wrong-answer"]');
    rightButton.className = CORRECT_ANSWER;
    wrongButtons.forEach((button) => { button.className = WRONG_ANSWER; });

    callback(correct);
  }

  render() {
    const { question, callback } = this.props;
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    const options = this.shuffle([correctAnswer, ...incorrectAnswers]);
    return (
      <div>
        <div>
          <p data-testid="question-category">
            { question.category }
          </p>
          <p data-testid="question-text">
            { question.question }
          </p>
        </div>
        <div>
          { options.map((option, index) => {
            const correct = option === correctAnswer;
            return (<Button
              key={ index }
              onClick={ () => this.handleClick(correct) }
              submit={ false }
              testid={
                correct
                  ? CORRECT_ANSWER
                  : `wrong-answer-${incorrectAnswers.indexOf(option)}`
              }
              value={ option }
            />);
          }) }
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};
