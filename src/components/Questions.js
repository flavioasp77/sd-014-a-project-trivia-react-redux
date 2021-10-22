import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  /*  constructor(props) {
    super(props);

    this.handleclick = this.handleclick.bind(this);

    this.state = {
      index: 0,
    };
  } */

  /*   handleclick() {
    const { index } = this.state;
    this.setState = {
      index: index + 1,
    };
  } */

  render() {
    // const { index } = this.state;
    const { questions } = this.props;
    const question = questions[0];
    return (
      <main>
        <div>
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
                onClick={ this.handleclick }
              >
                { question.correct_answer }
              </button>
            </li>
            {question.incorrect_answers.map((incorrect, ind) => (
              <li key={ ind }>

                <button
                  data-testid={ `wrong-answer-${ind}` }
                  type="button"
                  onClick={ this.handleclick }

                >
                  {incorrect}
                </button>
              </li>))}
          </ul>
        </div>
      </main>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Questions;
