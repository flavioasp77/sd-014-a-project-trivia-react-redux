import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';
import htmlDecode from '../services/htmlDecode';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      shuffledAnswers: [],
    };
  }

  componentDidMount() {
    const { data } = this.props;

    const shuffledAnswers = [...data.incorrect_answers, data.correct_answer];
    this.shuffle(shuffledAnswers);

    this.updateState({
      question: data.question,
      shuffledAnswers,
    });
  }

  componentDidUpdate() {
    const { data } = this.props;
    const { question } = this.state;

    if (data.question !== question) {
      const shuffledAnswers = [...data.incorrect_answers, data.correct_answer];
      this.shuffle(shuffledAnswers);

      this.updateState({
        question: data.question,
        shuffledAnswers,
      });
    }
  }

  updateState(state) {
    this.setState(state);
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements array[i] and array[j]
    }
  }
  // Reference: https://javascript.info/array-methods#shuffle-an-array

  render() {
    const { data, nextQuestion, onAnswerClick, shouldShowAnswer, timer } = this.props;
    const { category, correct_answer: correct, question } = data;
    const { shuffledAnswers } = this.state;

    return (
      <div className="question-card">
        <div className="container-question-card">
          <div className="question-container">
            <p className="question-category" data-testid="question-category">
              {category}
            </p>
            <p className="question-text" data-testid="question-text">
              {htmlDecode(question)}
            </p>
          </div>
          <span className="timer">{`Tempo: ${timer}`}</span>
        </div>
        <div className="container-question-card">
          <Answers
            answers={ shuffledAnswers }
            correctAnswer={ correct }
            onAnswerClick={ onAnswerClick }
            showAnswer={ shouldShowAnswer || timer === 0 }
          />
          {(shouldShowAnswer || timer === 0) && (
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
  nextQuestion: PropTypes.func.isRequired,
  onAnswerClick: PropTypes.func.isRequired,
  shouldShowAnswer: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

export default QuestionCard;
