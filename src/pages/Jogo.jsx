import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import {
  nextQuestion as nextQuestionAction, setAnswers as setAnswersAction,
  handleUserAnswer as handleUserAnswerAction,
  setTimer,
} from '../actions/indexActions';
import generateRandomAnswers,
{ attPlayerfromLS, getArrayPlayers, getStatePlayer } from '../helpers/index';
import Question from '../components/Question';

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      score: getStatePlayer().player.score,
      nextQuestion: false,
      secondsTimer: 30,
      interval: null,
    };
    this.handleResponse = this.handleResponse.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.timer = this.timer.bind(this);
    this.setArrayFromLS = this.setArrayFromLS.bind(this);
  }

  componentDidMount() {
    const { game: { questions, index }, setAnswers, history } = this.props;
    if (questions.length === 0) return history.push('/');
    setAnswers(generateRandomAnswers(questions[index]));
    this.timer();
  }

  setArrayFromLS({ player: { score, name } }) {
    const ArrayPlayers = getArrayPlayers();
    const objPlayer = ArrayPlayers[ArrayPlayers.length - 1];
    objPlayer.score = score;
    const newArray = ArrayPlayers.map((item) => (
      name === item.name ? objPlayer : item));
    localStorage.setItem('ranking', JSON.stringify(newArray));
  }

  handleResponse({ target: { value } }) {
    const { handleUserAnswer,
      game: { answers, timer: { timerValue } },
      setTimerGlobal } = this.props;
    const { secondsTimer } = this.state;
    const objFromLS = attPlayerfromLS(answers[value], timerValue);
    this.setArrayFromLS(objFromLS);
    this.setState({ score: objFromLS.player.score, nextQuestion: true });
    handleUserAnswer();
    setTimerGlobal({ timerValue: secondsTimer, stop: true });
  }

  decrementTimer() {
    this.setState((previous) => ({
      secondsTimer: previous.secondsTimer - 1,
    }));
  }

  handleNextQuestion() {
    const { game: { questions, index },
      setAnswers, history, nextQuestion, setTimerGlobal } = this.props;
    const { interval } = this.state;
    nextQuestion();
    setTimerGlobal({ stop: false, timerValue: 0 });
    this.setState({ secondsTimer: 30, nextQuestion: false });
    clearInterval(interval);
    this.timer();
    return index + 1 !== questions.length
      ? setAnswers(generateRandomAnswers(questions[index + 1]))
      : history.push('/feedback');
  }

  timer() {
    const { handleUserAnswer } = this.props;
    const ONE_SECOND = 1000;
    const timerInterval = setInterval(() => {
      const { secondsTimer } = this.state; // garante o state atualizado
      this.decrementTimer();
      if (secondsTimer === 1) {
        clearInterval(timerInterval);
        handleUserAnswer();
        this.setState({ nextQuestion: true });
        // faz que a resposta seja incorreta
      }
    },
    ONE_SECOND);
    return this.setState({
      interval: timerInterval,
    });
  }

  render() {
    const { game: { questions, index, infoIsLoaded, timer } } = this.props;
    const { score, nextQuestion, secondsTimer } = this.state;
    return (
      <main>
        <Header score={ score } />
        <Timer
          secondsTimer={ timer.stop
            ? timer.timerValue : secondsTimer }
        />
        {infoIsLoaded
        && <Question
          question={ questions[index] }
          handleNextQuestion={ this.handleNextQuestion }
          handleResponse={ this.handleResponse }
          nextQuestion={ nextQuestion }
        />}
      </main>
    );
  }
}

Jogo.propTypes = {
  game: PropTypes.objectOf(PropTypes.any).isRequired,
  setAnswers: PropTypes.func.isRequired,
  handleUserAnswer: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  setTimerGlobal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game }) => ({
  game,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswers: (payload) => dispatch(setAnswersAction(payload)),
  handleUserAnswer: () => dispatch(handleUserAnswerAction()),
  nextQuestion: () => dispatch(nextQuestionAction()),
  setTimerGlobal: (payload) => dispatch(setTimer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
