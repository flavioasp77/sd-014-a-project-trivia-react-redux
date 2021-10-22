import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ showAnswer: true });
  }

  render() {
    const { data } = this.props;
    const { showAnswer } = this.state;

    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      question,
    } = data;

    return (
      <div className="question-card">
        <div className="question-container">
          <p className="question-category" data-testid="question-category">
            {category}
          </p>
          <p className="question-text" data-testid="question-text">
            {question}
          </p>
        </div>
        <div className="answers-container">
          <button
            className={ showAnswer ? 'answer correct' : 'answer' }
            data-testid="correct-answer"
            onClick={ this.handleClick }
            type="button"
          >
            {correct}
          </button>
          {incorrect.map((answer, index) => (
            <button
              className={ showAnswer ? 'answer wrong' : 'answer' }
              data-testid={ `wrong-answer-${index}` }
              key={ `${answer}-${index}` }
              onClick={ this.handleClick }
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
