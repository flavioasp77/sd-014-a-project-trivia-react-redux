import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {
  handleUserAnswer as handleUserAnswerAction,
  nextQuestion as nextQuestionAction, setAnswers as setAnswersAction,
} from '../actions/indexActions';
import generateRandomAnswers from '../helpers';

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      score: JSON.parse(localStorage.getItem('state')).player.score,
      nextQuestion: false,
    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.answerButtons = this.answerButtons.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    const { state: { game: { questions, index } }, setAnswers } = this.props;
    setAnswers(generateRandomAnswers(questions, index));
  }

  answerButtons(questions, index) {
    const { state: { game: { answers } } } = this.props;
    return answers.map((answer, i) => {
      if (answer.item === questions[index].correct_answer) {
        return (
          <li key={ i }>
            <button
              value={ i }
              type="button"
              data-testid="correct-answer"
              disabled={ answer.isDisabled }
              onClick={ this.handleResponse }
              style={ { border: answer.border } }
            >
              {answer.item}
            </button>
          </li>);
      }
      return (
        <li key={ i }>
          <button
            type="button"
            data-testid={ `wrong-answer-${i}` }
            value={ i }
            disabled={ answer.isDisabled }
            onClick={ this.handleResponse }
            style={ { border: answer.border } }
          >
            {answer.item}
          </button>
        </li>
      );
    });
  }

  handleResponse({ target: { value } }) {
    const {
      handleUserAnswer, state: { game: { answers } },
    } = this.props;
    const objFromLS = JSON.parse(localStorage.getItem('state'));
    const response = answers[value];
    const RIGHT_ANSWER = 10;
    const result = response.isCorrect ? (RIGHT_ANSWER + (1 * response.difficulty)) : 0;
    objFromLS.player.score += result;
    objFromLS.player.assertions += result !== 0 ? 1 : 0;
    localStorage.setItem('state', JSON.stringify(objFromLS));
    this.setState({ score: objFromLS.player.score, nextQuestion: true });
    handleUserAnswer();
  }

  handleQuestions(questions, index) {
    return (
      <section>
        <h3 data-testid="question-category">
          {questions[index].category}
        </h3>
        <p data-testid="question-text">
          {questions[index].question}
        </p>
        <div id="answers">
          <ul>
            {this.answerButtons(questions, index)}
          </ul>
        </div>
      </section>
    );
  }

  handleNextQuestion() {
    const { state: { game: { questions, index } },
      setAnswers, history, nextQuestion } = this.props;
    nextQuestion();
    return index + 1 !== questions.length
      ? setAnswers(generateRandomAnswers(questions, (index + 1)))
      : history.push('/feedback');
  }

  render() {
    const { state: { game: { questions, index, infoIsLoaded } } } = this.props;
    const { score, nextQuestion } = this.state;
    return (
      <main>
        <Header score={ score } />
        {infoIsLoaded && this.handleQuestions(questions, index)}
        { nextQuestion
        && (
          <button
            onClick={ this.handleNextQuestion }
            type="button"
            data-testid="btn-next"
          >
            Próxima
          </button>)}
      </main>
    );
  }
}

Jogo.propTypes = {
  state: PropTypes.objectOf(PropTypes.any).isRequired,
  setAnswers: PropTypes.func.isRequired,
  handleUserAnswer: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  nextQuestion: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswers: (payload) => dispatch(setAnswersAction(payload)),
  handleUserAnswer: () => dispatch(handleUserAnswerAction()),
  nextQuestion: () => dispatch(nextQuestionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
