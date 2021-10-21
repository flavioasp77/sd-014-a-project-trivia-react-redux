import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getTriviaActionThunk } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };

    this.treatQuestions = this.treatQuestions.bind(this);
    this.renderMultiple = this.renderQuestion.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { getTrivia, token, questions } = this.props;
    if (prevProps.token !== token && token !== '') getTrivia(token);
    if (prevProps.questions !== questions) {
      this.treatQuestions();
    }
  }

  treatQuestions() {
    const { questions } = this.props;
    const options = questions.reduce((acc, question) => {
      const arrayAnswer = [...question.incorrect_answers, question.correct_answer];
      const objetAns = { ...question, arrayAnswer };
      acc.push(objetAns);
      return acc;
    }, []);
    this.setState({
      questions: options,
    });
  }

  renderQuestion() {
    const { questions } = this.state;
    return (
      <div>
        <Header />
        { questions[0].arrayAnswer.sort().map((answer, index, array) => (
          <button
            key={ index }
            type="button"
            data-testid={ questions[0].correct_answer === answer
              ? 'correct-answer'
              : `wrong-answer-${array.indexOf(answer)}` }
          >
            { answer }
          </button>
        )) }
      </div>
    );
  }

  render() {
    const { questions } = this.state;
    if (questions.length !== 0) {
      return (
        <div>
          <h3 data-testid="question-category">{questions[0].category}</h3>
          <p data-testid="question-text">{questions[0].question}</p>
          { this.renderQuestion() }
        </div>
      );
    }
    return (
      <div>
        Deu ruim!
      </div>
    );
  }
}

Game.propTypes = {
  getTrivia: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTrivia: (token) => dispatch(getTriviaActionThunk(token)),
});

const mapStateToProps = (state) => ({
  token: state.triviaReducer.token,
  questions: state.triviaReducer.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
