import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import Question from '../Components/Question';

import { addScore } from '../Redux/actions/index';
import {
  fetchTriviaQuestions,
  calculateScore,
  updateRanking,
  ONE_SECOND,
  CLOCK_TIME,
  INCREASER,
  DECREASER,
  GREEN,
  RED,
} from '../helper';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: {},
      index: 0,
      clock: CLOCK_TIME,
      answered: false,
    };
  }

  componentDidMount() {
    this.setGame();
  }

  setGame = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const questions = await fetchTriviaQuestions(token);
    this.setState({ questions, question: questions[0] }, () => {
      this.showNextQuestionButton();
      this.setQuestionTimer();
    });
  }

  setQuestionTimer = () => {
    const timer = setInterval(() => {
      const { clock, answered } = this.state;

      if (clock === 0 || answered) {
        this.highlightCorrectAnswers();
        this.showNextQuestionButton();
        clearInterval(timer);
        return;
      }

      this.setState((prev) => ({ clock: prev.clock - DECREASER }));
    }, ONE_SECOND);
  }

  nextQuestion = () => {
    const { questions } = this.state;

    this.setState((prev) => ({
      answered: false,
      index: prev.index + INCREASER,
      clock: CLOCK_TIME,
      question: questions[prev.index + INCREASER],
    }), () => {
      this.hideCorrectAnswers();
      this.showNextQuestionButton();
      this.setQuestionTimer();
    });
  }

  questionDisableCheck = () => {
    const { clock, answered } = this.state;
    return (clock === 0 || answered);
  }

  hideCorrectAnswers = () => {
    const wrongAnswers = document.querySelectorAll('.wrong');
    const rightAnswer = document.querySelector('.correct');
    wrongAnswers.forEach((answer) => answer.removeAttribute('style'));
    rightAnswer.removeAttribute('style');
  }

  highlightCorrectAnswers = () => {
    const wrongAnswers = document.querySelectorAll('.wrong');
    const rightAnswers = document.querySelector('.correct');
    wrongAnswers.forEach((answer) => { answer.style.border = RED; });
    rightAnswers.style.border = GREEN;
  }

  handleChoice = (userGotRight, difficulty) => {
    this.setState({ answered: true }, () => {
      const { clock } = this.state;
      const { scoreToState } = this.props;
      this.highlightCorrectAnswers();
      if (userGotRight) {
        scoreToState(calculateScore(clock, difficulty));
      }
    });
  }

  showNextQuestionButton = () => {
    const { clock, answered } = this.state;
    const button = document.querySelector('.btn-next');
    button.style.display = (answered || clock === 0 ? 'block' : 'none');
  }

  nextQuestionButtonOnClick = () => {
    const { history, score, name, img } = this.props;
    const { questions, index } = this.state;

    if (!questions[index + INCREASER]) {
      updateRanking(score, name, img);
      history.push('/feedback');
      return;
    }

    this.nextQuestion();
  }

  nextQuestionButton = () => (
    <button
      type="button"
      className="btn-next"
      onClick={ this.nextQuestionButtonOnClick }
      data-testid="btn-next"
    >
      Próxima
    </button>
  )

  render() {
    const { questions, question, clock } = this.state;
    if (questions.length === 0) return null;
    return (
      <main>
        <Header />
        <Question
          question={ question }
          handleChoice={ this.handleChoice }
          handleDisabled={ this.questionDisableCheck }
        />
        { this.nextQuestionButton() }
        <p>{clock}</p>
      </main>
    );
  }
}

Game.propTypes = {
  scoreToState: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  scoreToState: (score) => {
    dispatch(addScore(score));
  },
});

const mapStateToProps = (state) => ({
  score: state.score,
  name: state.user.name,
  img: state.user.img,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
