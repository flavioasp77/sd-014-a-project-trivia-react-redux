import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decodeHTMLEntities } from '../helper';

export default class Question extends Component {
  render() {
    const { question, handleChoice, handleDisabled } = this.props;
    const { difficulty } = question;
    const correct = question.correct_answer;
    const incorrect = question.incorrect_answers; // array
    return (
      <div>
        <h2 data-testid="question-category">
          { question.category }
        </h2>
        <p data-testid="question-text">
          { decodeHTMLEntities(question.question) }
        </p>
        {[correct, ...incorrect].sort().map((answer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={
              answer === correct ? 'correct-answer' : `wrong-answer-${index}`
            }
            className={
              answer === correct ? 'correct' : 'wrong'
            }
            onClick={ () => { handleChoice((correct === answer), difficulty); } }
            disabled={ handleDisabled() }
          >
            {decodeHTMLEntities(answer)}
          </button>
        ))}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChoice: PropTypes.func.isRequired,
  handleDisabled: PropTypes.func.isRequired,
};

// category: "Geography"
// correct_answer: "False"
// difficulty: "medium"
// incorrect_answers: ['True']
// question: "Is Tartu the capital of Estonia?"
// type: "boolean"

// category: "Entertainment: Japanese Anime & Manga"
// correct_answer: "Diane"difficulty
// incorrect_answers: (3) ['Sakura', 'Ayano', 'Sheska']
// question: "In the anime Seven Deadly Sins what is the name of one of the sins?"
// type: "multiple"
