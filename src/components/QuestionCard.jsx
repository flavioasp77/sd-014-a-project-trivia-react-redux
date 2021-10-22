import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';
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
      <>
        <div className="question-card">
          <div className="question-container">
            <p className="question-category" data-testid="question-category">
              {category}
            </p>
            <p className="question-text" data-testid="question-text">
              {question}
            </p>
          </div>
          <Answers
            correctAnswer={ correct }
            incorrectAnswers={ incorrect }
            onAnswerClick={ this.handleClick }
            showAnswer={ showAnswer }
          />
        </div>
        {showAnswer && (
          <button className="btn-next" data-testid="btn-next" type="button">
            PRÓXIMA
          </button>
        )}
      </>
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
