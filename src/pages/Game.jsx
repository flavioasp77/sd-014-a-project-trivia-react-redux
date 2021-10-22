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
      timer: false,
      timerId: '',
      counterId: '',
      clickedAnswer: '',

    };

    this.treatQuestions = this.treatQuestions.bind(this);
    this.renderMultiple = this.renderQuestion.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.handleClick = this.handleClick.bind(this);

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
      // FAÇA ALGUMA COISA QUANTO TERMINAR OS 30 SEGUNDOS
      clearInterval(counterId);
    }, TIME_OUT);

    this.setState({
      timer: true,
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
    this.setState({
      clickedAnswer: answer,
    });
  }

  renderQuestion() {
    const { questions, clickedAnswer } = this.state;
    return (
      <div>
        <Header />
        { questions[0].arrayAnswer.sort().map((answer, index, array) => (
          <button
            className={
              clickedAnswer && (
                answer === questions[0].correct_answer
                  ? 'correctAnswer' : 'wrongAnswer')
            }
            onClick={ () => this.handleClick(answer) }
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
    const { counter, questions } = this.state;
    if (questions.length !== 0) {
      return (
        <div>

          <h3 data-testid="question-category">{questions[0].category}</h3>
          <p data-testid="question-text">{questions[0].question}</p>
          { this.renderQuestion() }
          <h4>{`Tempo: ${counter}`}</h4>
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
