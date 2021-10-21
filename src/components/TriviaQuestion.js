import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TriviaQuestion extends Component {
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

  mapAlternatives() {
    const { question, scrambledQuestions } = this.props;
    let wrongIndex = 0;
    return scrambledQuestions.map((alternative, index) => {
      const correct = 'correct-answer';
      const wrong = `wrong-answer-${wrongIndex}`;
      const button = (
        <button
          key={ index }
          type="button"
          data-testid={ alternative === question.correct_answer ? correct : wrong }
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
    console.log(question);
    return (
      <div>
        {question !== undefined && this.questionRender()}
      </div>
    );
  }
}

TriviaQuestion.propTypes = {
  question: PropTypes.arrayOf(PropTypes.any).isRequired,
  scrambledQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
