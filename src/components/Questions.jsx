import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionApiThunk } from '../redux/actions';

class Questions extends Component {
  componentDidMount() {
    const { token, getQuestion } = this.props;
    getQuestion(token);
  }

  render() {
    const { questions } = this.props;
    const CODE = 3;
    if (questions.results === undefined) return <p>Carregando...</p>;
    if (questions.response_code === CODE) {
      return <p>O tempo expirou! Inicie o jogo novamente</p>;
    }
    const { results } = questions;
    return (
      <main>
        <h2 data-testid="question-category">
          { results[0].category }
        </h2>
        <p data-testid="question-text">
          { results[0].question }
        </p>
        <div>
          <button type="button" data-testid="correct-answer">
            { results[0].correct_answer }
          </button>
          { results[0].incorrect_answers.map((answer, index) => (
            <button key={ index } type="button" data-testid={ `wrong-answer-${index}` }>
              { answer }
            </button>
          ))}
        </div>
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.success,
  questions: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (token) => dispatch(questionApiThunk(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
