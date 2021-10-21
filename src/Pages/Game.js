import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import Question from '../Components/Question';

import { fetchTriviaQuestions, ONE_SECOND } from '../helper';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: {},
      index: 0,
      clock: 10,
      answered: false,
    };
  }

  componentDidMount() {
    this.setGame();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  nextQuestion = () => {
    const { questions } = this.state;
    this.setState((prev) => ({
      answered: false,
      index: prev.index + 1,
      clock: 10,
      question: questions[prev.index + 1],
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

      this.setState((prev) => ({ clock: prev.clock - 1 }));
    }, ONE_SECOND);
  }

  highlightAnswers = () => {
    document.querySelectorAll('.wrong').forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
    });
    document.querySelector('.correct').style.border = '3px solid rgb(6, 240, 15)';
  }

  handleChoice = () => {
    this.highlightAnswers();
    this.setState({ answered: true });
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
        />
        { this.nextQuestionButton() }
        <p>{clock}</p>
      </main>
    );
  }
}

export default connect(null, null)(Game);
