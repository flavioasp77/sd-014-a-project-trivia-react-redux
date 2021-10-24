import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.counter = setInterval(() => {
      this.setState(({ seconds }) => ({ seconds: seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) clearInterval(this.counter);
  }

  render() {
    const { data, nextQuestion, shouldShowAnswer, showAnswer } = this.props;
    const { seconds } = this.state;

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
            onAnswerClick={ showAnswer }
            showAnswer={ shouldShowAnswer || seconds === 0 }
          />
        </div>
        <div className="container-timer">
          <p className="timer">{`Tempo: ${seconds}`}</p>
          {(shouldShowAnswer || seconds === 0) && (
            <button
              className="btn-next"
              data-testid="btn-next"
              onClick={ nextQuestion }
              type="button"
            >
              PRÓXIMA
            </button>
          )}
        </div>
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
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  shouldShowAnswer: PropTypes.bool.isRequired,
  showAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
