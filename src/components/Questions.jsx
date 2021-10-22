import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions/index';

class Questions extends Component {
  componentDidMount() {
    const { fetchQuestionsAPI } = this.props;
    fetchQuestionsAPI();
  }

  render() {
    const { questions } = this.props;

    if (questions.length > 0) {
      return (
        <div>
          <h2 data-testid="question-category">
            { questions[0].category }
          </h2>
          <p data-testid="question-text">
            { questions[0].question }
          </p>
          <button
            type="button"
            data-testid="correct-answer"
          >
            { questions[0].correct_answer }
          </button>
          { questions[0].incorrect_answers.map((question, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              { question }
            </button>
          ))}
        </div>
      );
    }

    return (
      <div>
        Carregando...
      </div>
    );
  }
}

Questions.propTypes = {
  fetchQuestionsAPI: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsAPI: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
