import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getTriviaActionThunk, registerPlayer } from '../actions';
import '../styles/Game.css';

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
      score: 0,
      assertions: 0,
    };
    this.treatQuestions = this.treatQuestions.bind(this);
    this.renderMultiple = this.renderQuestion.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
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
    const getLocal = localStorage.getItem('ranking');
    if (!getLocal) localStorage.setItem('ranking', JSON.stringify([]));
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
    }, () => this.handleScore(answer));
  }

  handleNext() {
    const { indexNext, questions } = this.state;
    const { history } = this.props;
    if (indexNext < questions.length - 1) {
      this.setState({
        indexNext: indexNext + 1,
        counter: 30,
        clickedAnswer: '',
        answered: false,
        disabledBtn: false,
      });
      this.startTimeOut();
    } else {
      const { player:
        { score, gravatarEmail, name } } = JSON.parse(localStorage.getItem('state'));
      const hash = MD5(gravatarEmail).toString();
      const picture = `https://www.gravatar.com/avatar/${hash}`;
      const playerRanking = { name, score, picture };
      const previousRanking = JSON.parse(localStorage.getItem('ranking'));
      localStorage
        .setItem('ranking', JSON.stringify([...previousRanking, playerRanking]));
      history.push('/feedback');
    }
  }

  handleScore(answer) {
    const { questions, counter, indexNext } = this.state;
    const { getPlayer, email, name } = this.props;
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
    let { score, assertions } = this.state;
    let objeto = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    if (answer === questions[indexNext].correct_answer) {
      const POINTS = 10;
      assertions += 1;
      score += (counter * difficulty) + POINTS;
      objeto = { player: { ...objeto.player, assertions, score } };
    }
    this.setState({ score, assertions }, () => {
      localStorage.setItem('state', JSON.stringify(objeto));
      getPlayer({ ...objeto });
    });
  }

  renderQuestion() {
    const { questions, clickedAnswer, disabledBtn, indexNext } = this.state;
    return (
      <div>
        { questions[indexNext].arrayAnswer.sort().map((answer, index, array) => (
          <button
            disabled={ clickedAnswer.length > 0 || disabledBtn }
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
        <div className="game-background">
          <Header />
          <div className="game-box">
            <h3 data-testid="question-category">{questions[indexNext].category}</h3>
            <p data-testid="question-text">{questions[indexNext].question}</p>
            { this.renderQuestion() }
            {
              (answered)
              && (
                <button
                  className="next-button"
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
        </div>
      );
    }
    return (
      <div className="game-background loading">
        <h3>Carregando ...</h3>
      </div>
    );
  }
}

Game.propTypes = {
  getTrivia: PropTypes.func.isRequired,
  getPlayer: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTrivia: (token) => dispatch(getTriviaActionThunk(token)),
  getPlayer: (player) => dispatch(registerPlayer(player)),
});

const mapStateToProps = (state) => ({
  token: state.triviaReducer.token,
  questions: state.triviaReducer.questions,
  name: state.userReducer.name,
  email: state.userReducer.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
