import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    const { questions } = this.props;
    // const { question, category, correct_answer, incorrect_answers } = questions;
    return (
      <div>
        <Header />
        {questions.map((question, index) => (
          <div key={ index }>
            <h1>
              <span data-testid="question-category">{question.category}</span>
            </h1>
            <h2>
              <span data-testid="question-text">{question.question}</span>
            </h2>
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
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  loading: state.questions.loading,
});

export default connect(mapStateToProps)(Game);
