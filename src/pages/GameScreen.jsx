import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import TriviaQuestion from '../components/TriviaQuestion';
import { useToken } from '../services/APIrequests';
import { shuffleArray, filtraEstadoGameScreen } from '../services/functions';
import { getLocalToken } from '../services/localStorage';
import '../styles/TriviaQuestion.style.css';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      indexOfQuestion: 0,
      redirect: false,
      alternativesShuffled: [],
      visibleButton: false,
      className: false,
      timer: 30,
      timeDisableButton: false,
      idInterval: null,
    };
    this.saveQuestions = this.saveQuestions.bind(this);
    this.scrambleAlternatives = this.scrambleAlternatives.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.visibleButton = this.visibleButton.bind(this);
    this.handleClickQuestion = this.handleClickQuestion.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setIntervalFunction = this.setIntervalFunction.bind(this);
    this.delayToResponse = this.delayToResponse.bind(this);
  }

  componentDidMount() {
    this.saveQuestions();
  }

  // função para gerar o tempo
  setIntervalFunction() {
    const TIME_INTERVAL = 1000;
    const idSetInterval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1, idInterval: idSetInterval }));
    }, TIME_INTERVAL);
  }

  // reset do timer
  resetTimer() {
    this.setState({ timer: 0, timeDisableButton: true });
  }

  delayToResponse() {
    const TIMEOUT = 5000;
    this.setState({ timeDisableButton: true });
    setTimeout(() => {
      this.setIntervalFunction();
      this.setState({ timeDisableButton: false });
    }, TIMEOUT);
  }

  async saveQuestions() {
    const token = getLocalToken();
    const questions = await useToken(token);
    await this.setState({
      questions: questions.results,
    });
    console.log(questions.results);
    this.scrambleAlternatives();
  }

  scrambleAlternatives() {
    const { questions, indexOfQuestion } = this.state;
    const alternatives = [
      questions[indexOfQuestion].correct_answer,
      ...questions[indexOfQuestion].incorrect_answers];
    const alternativesShuffled = shuffleArray(alternatives);
    this.setState({ alternativesShuffled });
  }

  async handleClickNext() {
    const { indexOfQuestion } = this.state;
    const INDEX_LIMIT_OF_QUESTIONS = 4;
    if (indexOfQuestion < INDEX_LIMIT_OF_QUESTIONS) {
      await this.setState({
        indexOfQuestion: indexOfQuestion + 1,
        className: false,
      });
      await this.scrambleAlternatives();
    } else {
      this.setState({ redirect: true });
    }
    this.setState({ timer: 30 });
    this.delayToResponse();
  }

  handleClickQuestion() {
    this.setState({ className: true });
    this.visibleButton();
  }

  visibleButton() {
    this.setState({
      visibleButton: true,
    });
  }

  render() {
    const {
      questions, indexOfQuestion } = this.state;
    const { redirect } = this.state;
    return (
      <div className="Trivia-question">
        <Header />
        <TriviaQuestion
          stateActual={ filtraEstadoGameScreen(this.state) }
          question={ questions[indexOfQuestion] }
          // visibleButton={ this.visibleButton }
          handleClickQuestion={ this.handleClickQuestion }
          delayToResponse={ this.delayToResponse }
          resetTimer={ this.resetTimer }
          handleClickNext={ this.handleClickNext }
        />
        {/* {visibleButton && (
          <button
            type="button"
            onClick={ this.handleClickNext }
            data-testid="btn-next"
            className="button-next"
          >
            Próxima
          </button>
        )} */}
        { redirect && <Redirect to="/feedback" /> }
      </div>
    );
  }
}

export default GameScreen;
