import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <main>
        {questions.map((question, index) => (
          <div key={ index }>
            <p>
              Category:
              <span data-testid="question-category">{question.category}</span>
            </p>
            <p>
              Question:
              <span data-testid="question-text">{question.question}</span>
            </p>
            <ul>
              <li>
                <button
                  data-testid="correct-answer"
                  type="button"
                >
                  { question.correct_answer }
                </button>
              </li>
              {question.incorrect_answers.map((incorrect, ind) => (
                <li key={ ind }>

                  <button
                    data-testid={ `wrong-answer-${ind}` }
                    type="button"
                  >
                    {incorrect}
                  </button>
                </li>))}
            </ul>
          </div>))}
      </main>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Questions;
