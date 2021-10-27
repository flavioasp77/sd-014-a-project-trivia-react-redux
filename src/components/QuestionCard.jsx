import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
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
      category, difficulty,
      question,
      answers,
    } = questionInfo;
    return (
      <div
        className="d-flex w-75 m-auto flex-column
      justify-content-around align-items-center"
      >
        <h2 data-testid="question-category" className="text-center">{category}</h2>
        <h3 data-testid="question-text" className="text-center">{question}</h3>
        <div className="d-flex w-75 justify-content-center flex-wrap">
          {answers.map((item, index) => {
            const verify = this.verifyCorrectAnswer(item, index);
            return (
              <button
                key={ index }
                type="button"
                onClick={ () => handleIndex(verify, difficulty) }
                data-testid={ verify }
                className={ `btn around mx-2 quest-border quest-button
                ${/correct/.test(verify)
                ? 'correct-answer' : 'wrong-answer'}  m-2 ` }
              >
                { item }
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  questionInfo: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  handleIndex: PropTypes.func.isRequired,
};

export default QuestionCard;
