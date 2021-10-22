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
      // timer: false,
      timerId: '',
      counterId: '',
      clickedAnswer: '',
      disabledBtn: false,
      score: 0,
    };

    this.treatQuestions = this.treatQuestions.bind(this);
    this.renderMultiple = this.renderQuestion.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  componentDidMount() {
    const { score } = this.state;
    const player = {
      player: {
        name: '',
        assertions: 0,
        score,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
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
      });
    }, TIME_OUT);

    this.setState({
      // timer: true,
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
    });
    this.handleScore(answer);
  }

  handleScore(answer) {
    const { questions, counter } = this.state;
    let difficulty;
    const HARD_SCORE = 3;

    switch (questions[0].difficulty) {
    case 'easy':
      difficulty = 1;
      break;
    case 'medium':
      difficulty = 2;
      break;
    case 'hard':
      difficulty = HARD_SCORE;
      break;
    default:
      return 0;
    }

    if (answer === questions[0].correct_answer) {
      const POINTS = 10;
      let { score } = this.state;
      score += (counter * difficulty) + POINTS;
      const player = {
        player: {
          name: '',
          assertions: 0,
          score,
          gravatarEmail: '',
        },
      };
      this.setState({
        score,
      }, () => localStorage.setItem('state', JSON.stringify(player)));
    } else {
      console.log('errou!');
    }
  }

  renderQuestion() {
    const { questions, clickedAnswer, disabledBtn } = this.state;
    return (
      <div>
        { questions[0].arrayAnswer.sort().map((answer, index, array) => (
          <button
            disabled={ disabledBtn }
            className={
              (clickedAnswer || disabledBtn) && (
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
          <Header />
          <h3 data-testid="question-category">{questions[0].category}</h3>
          <p data-testid="question-text">{questions[0].question}</p>
          { this.renderQuestion() }
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
