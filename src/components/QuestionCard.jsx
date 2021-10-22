import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
  render() {
    const { data } = this.props;

    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      question,
    } = data;

    return (
      <div>
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-text">{question}</div>
        <div>
          <button data-testid="correct-answer" type="button">
            {correct}
          </button>
          {incorrect.map((answer, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              key={ `${answer}-${index}` }
              type="button"
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionCard;
