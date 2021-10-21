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

  nextQuestion = () => {
    const { questions } = this.state;

    this.setState((prev) => ({
      answered: false,
      index: prev.index + INCREASER,
      clock: CLOCK_TIME,
      question: questions[prev.index + INCREASER],
    }), () => {
      document.querySelectorAll('.wrong').forEach((button) => {
        button.removeAttribute('style');
      });
      document.querySelector('.correct').removeAttribute('style');
      this.hiddenCheckButton();
      this.setQuestionTimer();
    });
  }

  setGame = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const questions = await fetchTriviaQuestions(token);
    this.setState({ questions, question: questions[0] }, () => {
      this.setQuestionTimer();
      this.hiddenCheckButton();
    });
  }

  setQuestionTimer = () => {
    const timer = setInterval(() => {
      const { clock, answered } = this.state;

      if (clock === 0 || answered) {
        this.highlightAnswers();
        clearInterval(timer);
        return;
      }

      this.setState((prev) => ({ clock: prev.clock - DECREASER }));
    }, ONE_SECOND);
  }

  disableButton = () => {
    const { clock, answered } = this.state;
    return (clock === 0 || answered);
  }

  highlightAnswers = () => {
    const wrongAnswers = document.querySelectorAll('.wrong');
    const rightAnswers = document.querySelector('.correct');

    if (wrongAnswers && rightAnswers) {
      wrongAnswers.forEach((button) => {
        button.style.border = '3px solid rgb(255, 0, 0)';
      });
      rightAnswers.style.border = '3px solid rgb(6, 240, 15)';
    }
  }

  handleChoice = (result, difficulty) => {
    this.highlightAnswers();
    this.setState({ answered: true }, () => {
      this.hiddenCheckButton();
    });
    const { clock } = this.state;
    const { scoreToState } = this.props;
    if (result) {
      scoreToState(calculateScore(clock, difficulty));
    }
  }

  hiddenCheckButton = () => {
    const { answered, clock } = this.state;
    const button = document.querySelector('.btn-next');
    button.style.display = (answered || clock === 0 ? 'block' : 'none');
  }

  handleNextButton = () => {
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
      onClick={ this.handleNextButton }
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
          handleDisabled={ this.disableButton }
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
