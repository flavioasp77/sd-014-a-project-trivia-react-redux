import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const { data } = this.props;

    const {
      category,
      question,
      correct_answer: correct,
      incorrect_answers: incorrect,
    } = data;

    return (
      <div>
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-text">{question}</div>
        <div>
          <button type="button" data-testid="correct-answer">
            {correct}
          </button>
          {incorrect.map((answer, index) => (
            <button
              key={ `${answer}-${index}` }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Question;
