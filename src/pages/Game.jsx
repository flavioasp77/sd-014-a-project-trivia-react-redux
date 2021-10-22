import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    const { questions } = this.props;
    const { question, category, correctAnswer, incorrectAnswer } = questions;
    return (
      <div>
        <Header />
        <div>
          <h1>Question:</h1>
          <h2 data-testid="question-text">{ question }</h2>
          <h3>Category:</h3>
          <h4 data-testid="question-category">{ category }</h4>
          <form>
            <p>Alternatives:</p>
            <label htmlFor="correct-answer">
              <li data-testid="correct-answer">{ correctAnswer }</li>
              <input type="checkbox" id="correct-answer" />
            </label>
            { incorrectAnswer.map((answer, index) => (
              <label htmlFor="incorrect-answer" key="incorrect-answer">
                <li data-testid={ `wrong-answer-${index}` }>{ answer }</li>
                <input type="checkbox" id="incorrect-answer" />
              </label>
            ))}
            <input
              type="button"
              value="Enviar"
            />
          </form>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
    correctAnswer: PropTypes.string,
    incorrectAnswer: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  loading: state.questions.loading,
});

export default connect(mapStateToProps)(Game);
