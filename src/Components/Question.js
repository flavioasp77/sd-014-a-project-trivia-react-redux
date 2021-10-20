import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Question extends Component {
  render() {
    const { question, handleChoice } = this.props;
    const correct = question.correct_answer;
    const incorrect = question.incorrect_answers; // array

    return (
      <div>
        <h2 data-testid="question-category">
          { question.category }
        </h2>
        <p data-testid="question-text">
          { question.question.toString() }
        </p>
        {[correct, ...incorrect].sort().map((answer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={
              answer === correct ? 'correct-answer' : `wrong-answer-${index}`
            }
            onClick={ handleChoice }
          >
            {answer}
          </button>
        ))}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChoice: PropTypes.func.isRequired,
};

// category: "Geography"
// correct_answer: "False"
// difficulty: "medium"
// incorrect_answers: ['True']
// question: "Is Tartu the capital of Estonia?"
// type: "boolean"

// category: "Entertainment: Japanese Anime & Manga"
// correct_answer: "Diane"
// difficulty: "easy"
// incorrect_answers: (3) ['Sakura', 'Ayano', 'Sheska']
// question: "In the anime Seven Deadly Sins what is the name of one of the sins?"
// type: "multiple"
