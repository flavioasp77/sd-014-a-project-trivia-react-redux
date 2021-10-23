import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getTriviaActionThunk } from '../actions';
import './Game.css';

const TIME_OUT = 30000;
const ONE_SECOND = 1000;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      counter: 30,
      timerId: '',
      counterId: '',
      clickedAnswer: '',
      disabledBtn: false,
      indexNext: 0,
      answered: false,
    };

    this.treatQuestions = this.treatQuestions.bind(this);
    this.renderMultiple = this.renderQuestion.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { getTrivia, token, questions } = this.props;
    if (prevProps.token !== token && token !== '') getTrivia(token);
    if (prevProps.questions !== questions) {
      this.treatQuestions();
    }
  }

  startTimeOut() {
    const counterId = setInterval(() => {
      let { counter } = this.state;
      counter -= 1;
      this.setState({ counter });
    }, ONE_SECOND);

    const timerId = setTimeout(() => {
      clearInterval(counterId);
      this.setState({
        disabledBtn: true,
        answered: true,
        clickedAnswer: '',
      });
    }, TIME_OUT);

    console.log(timerId, counterId);

    this.setState({
      timerId,
      counterId,
    });
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
    }, () => this.startTimeOut());
  }

  handleClick(answer) {
    const { counterId, timerId } = this.state;
    clearInterval(counterId);
    clearInterval(timerId);
    this.setState({
      clickedAnswer: answer,
      answered: true,
    });
    console.log(timerId, counterId);
  }

  handleNext() {
    const { indexNext, questions } = this.state;
    if (indexNext < questions.length - 1) {
      this.setState({
        indexNext: indexNext + 1,
        counter: 30,
        clickedAnswer: '',
        answered: false,
        disabledBtn: false,
      });
      this.startTimeOut();
    }
  }

  renderQuestion() {
    const { questions, clickedAnswer, disabledBtn, indexNext } = this.state;
    return (
      <div>
        { questions[indexNext].arrayAnswer.sort().map((answer, index, array) => (
          <button
            disabled={ disabledBtn }
            className={
              (clickedAnswer || disabledBtn) && (
                answer === questions[indexNext].correct_answer
                  ? 'correctAnswer' : 'wrongAnswer')
            }
            onClick={ () => this.handleClick(answer) }
            key={ index }
            type="button"
            data-testid={ questions[indexNext].correct_answer === answer
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
    const { counter, questions, indexNext, answered } = this.state;
    if (questions.length !== 0) {
      return (
        <div>
          <Header />
          <h3 data-testid="question-category">{questions[indexNext].category}</h3>
          <p data-testid="question-text">{questions[indexNext].question}</p>
          { this.renderQuestion() }
          {
            (answered)
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNext }
              >
                Próxima
              </button>
            )
          }

          <h4>{`Tempo: ${counter}`}</h4>
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
