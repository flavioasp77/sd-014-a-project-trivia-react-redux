import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
  // https://javascript.info/array-methods#shuffle-an-array
  shuffle(array) {
    const half = 0.5;
    return array.sort(() => Math.random() - half);
  }

  verifyCorrectAnswer(answer, index) {
    const { questionInfo: { correct_answer: correctAnswer } } = this.props;
    if (answer === correctAnswer) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  render() {
    const { questionInfo, handleIndex } = this.props;
    const {
      category, question, incorrect_answers: incorrect, correct_answer: correct,
    } = questionInfo;
    const arrayOfAnswers = [...incorrect, correct];
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h3 data-testid="question-text">{question}</h3>
        {this.shuffle(arrayOfAnswers).map((item, index) => {
          const verify = this.verifyCorrectAnswer(item, index);
          return (
            <button
              key={ index }
              t
              type="button"
              onClick={ () => handleIndex(verify) }
              data-testid={ verify }
              className={ /correct/.test(verify)
                ? 'correct-answer' : 'wrong-answer' }
            >
              { item }
            </button>
          );
        })}
      </div>
    );
  }
}

QuestionCard.propTypes = {
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  handleIndex: PropTypes.func.isRequired,
};

export default QuestionCard;
