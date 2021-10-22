import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/TriviaQuestion.style.css';

export default class TriviaQuestion extends Component {
  constructor() {
    super();
    this.state = {
      className: false,
    };
    this.handleClick = this.handleClick.bind(this);
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
    const { className } = this.state;
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
