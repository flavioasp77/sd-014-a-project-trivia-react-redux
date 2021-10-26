import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Header from '../components/Header';
import '../utils/localstorage';
import '../style/Game.css';

let control = 1;
let control2 = 1;

const ONE_SECOND = 1000;
const magicNumber = '0.33';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      disabled: false,
      correct: '',
      wrong: '',
      answered: false,
      remainingTime: 30,
      redirect: false,
      shuffledAnswers: [],
      time: 30,
      intervalId: 0,
      score: 0,
    };
    this.countdownTimer = this.countdownTimer.bind(this);
    this.updateRemaingTime = this.updateRemaingTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.renderAlternatives = this.renderAlternatives.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.createInterval = this.createInterval.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }
  
  //  https://medium.com/@staceyzander/setinterval-and-clearinterval-in-react-b1d0ee1e1a6a
  componentDidMount() {
    this.createInterval()
  }

  createInterval() {
    const id = setInterval(() => {
      this.setState(function(localState) {
        return { time: localState.time - 1 };
      });
    }, ONE_SECOND);
    this.setState({ intervalId: id });
  }

  updateRemaingTime(time) {
    const { remainingTime } = this.state;

    if (time === 0 && control === 1) {
      this.setState({
        remainingTime: 0,
        disabled: true,
      });
      control = remainingTime;
    }
  }

  countdownTimer() {
    const { remainingTime: timer } = this.state;
    return (
      <section>
        <CountdownCircleTimer
          isPlaying
          duration={ timer }
          colors={ [
            ['#004777', magicNumber],
            ['#F7B801', magicNumber],
            ['#A30000', magicNumber],
          ] }
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) this.updateRemaingTime(0);
            return remainingTime;
          } }
        </CountdownCircleTimer>
      </section>
    );
  }

  updateScore(target) {
    const { arrayQuestions } = this.props;
    const { index, time } = this.state;
    const objectQuestion = arrayQuestions[index];
    const { difficulty } = objectQuestion;
    if (target.className === 'answer-correct') {
      let multiple = 1;
      if (difficulty === 'hard') multiple = 3;
      if (difficulty === 'medium') multiple = 2;
      const result = 10 + (time * multiple);
      const player = localStorage.getObj('state');
      console.log(player.player);
      player.player.score += result;
      console.log(player.player.score);
      this.setState({ score: player.player.score });
      localStorage.setObj('state', player);
    }
  }

  handleClick({ target }) {
    const { intervalId } = this.state;
    this.setState({
      correct: 'answer-correct',
      wrong: 'answer-incorrect',
      disabled: true,
      answered: true,
    }, () => this.updateScore(target));
    clearInterval(intervalId);
  }

  nextClick() {
    const LAST_QUESTION = 4;
    const { index } = this.state;
    if (index === LAST_QUESTION) {
      this.setState({
        redirect: true,
      });
    }

    this.setState({
      index: index + 1,
      disabled: false,
      correct: '',
      wrong: '',
      answered: false,
      remainingTime: 30,
      time: 30,
      intervalId: 0,
    });
    control2 = 1;
    this.createInterval();
  }

  shuffleQuestions(array) {
    const shufflingArray = array.map((question, i) => {
      const answerObject = {
        value: i === 0 ? 'correct' : 'wrong',
        answer: question,
        index: i === 0 ? 0 : i - 1,
      };
      question = answerObject;
      return question;
    });

    for (let i = shufflingArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const k = shufflingArray[i];
      shufflingArray[i] = shufflingArray[j];
      shufflingArray[j] = k;
    }
    this.setState({ shuffledAnswers: shufflingArray });
    control2 = 0;
  }

  renderAlternatives(shuffledAnswers) {
    const { correct, wrong, disabled, answered } = this.state;

    return (
      <>
        { shuffledAnswers.map((answer, i) => (
          <section key={ i }>
            <br />
            <button
              type="button"
              data-testid={
                answer.value === 'correct' ? 'correct-answer'
                  : `wrong-answer-${answer.index}`
              }
              key={ i }
              disabled={ disabled }
              onClick={ this.handleClick }
              className={ answer.value === 'correct' ? correct : wrong }
            >
              { answer.answer }
            </button>
          </section>
        ))}
        { !answered && this.countdownTimer() }
      </>
    );
  }

  renderQuestions(answerArray) {
    const { answered, shuffledAnswers } = this.state;
    if (!answered && control2 === 1) this.shuffleQuestions(answerArray);

    return (
      <>
        { this.renderAlternatives(shuffledAnswers) }
        { answered && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.nextClick }
          >
            Next
          </button>)}
      </>
    );
  }

  render() {
    const { arrayQuestions } = this.props;
    const { index, redirect } = this.state;

    if (arrayQuestions.length === 0) return <h1>... Loading</h1>;
    if (redirect) return <Redirect to="/feedback" />;

    const objectQuestion = arrayQuestions[index];
    const {
      category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = objectQuestion;
    const answers = [correctAnswer, ...incorrectAnswers];

    return (
      <>
        <Header />
        <section>
          <section data-testid="question-category">{ category }</section>
          <br />
          <section data-testid="question-text">{ question }</section>
          <br />
          { this.renderQuestions(answers) }
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    arrayQuestions: state.questionsReducer.questions,
  };
}

Game.propTypes = {
  arrayQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Game);
