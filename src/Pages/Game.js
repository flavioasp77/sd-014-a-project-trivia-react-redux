import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import Question from '../Components/Question';

import { addScore } from '../Redux/actions/index';
import {
  fetchTriviaQuestions,
  calculateScore,
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
    });

    this.setQuestionTimer();
  }

  setGame = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const questions = await fetchTriviaQuestions(token);
    this.setState({ questions, question: questions[0] }, () => {
      this.setQuestionTimer();
    });
  }

  setQuestionTimer = () => {
    const timer = setInterval(() => {
      const { clock, answered } = this.state;

      // parar o timer: clicar em uma opção ou timer chegar a 0;
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
    document.querySelectorAll('.wrong').forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
    });
    document.querySelector('.correct').style.border = '3px solid rgb(6, 240, 15)';
  }

  handleChoice = (result, difficulty) => {
    this.highlightAnswers();
    this.setState({ answered: true });
    const { clock } = this.state;
    const { scoreToState } = this.props;
    if (result) {
      scoreToState(calculateScore(clock, difficulty));
    }
  }

  nextQuestionButton = () => (
    <button
      type="button"
      onClick={ this.nextQuestion }
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
};

const mapDispatchToProps = (dispatch) => ({
  scoreToState: (score) => {
    dispatch(addScore(score));
  },
});

export default connect(null, mapDispatchToProps)(Game);
