import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { questionCurrent: { question, category }, questionCurrent,
    } = this.props;
    return (
      <section>
        <div>
          <h4 data-testid="question-category">{ category }</h4>
          <p data-testid="question-text">{ question }</p>
        </div>
        <div>
          <button data-testid="correct-answer" type="button">
            { questionCurrent.correct_answer }
          </button>
          {questionCurrent.incorrect_answers.map((wrong, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              type="button"
            >
              { wrong }
            </button>
          ))}
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string,
  category: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  correct_answer: PropTypes.string,
}.isRequired;

export default Question;
