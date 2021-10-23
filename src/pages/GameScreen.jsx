import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Header } from '../components/Header';
import TriviaQuestion from '../components/TriviaQuestion';
import { useToken } from '../services/APIrequests';
import shuffleArray from '../services/functions';
import { getLocalToken } from '../services/localStorage';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      alternativesShuffled: [],
      indexOfQuestion: 0,
      visibleButton: false,
      className: false,
      redirect: false,
    };
    this.saveQuestions = this.saveQuestions.bind(this);
    this.scrambleAlternatives = this.scrambleAlternatives.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.visibleButton = this.visibleButton.bind(this);
    this.handleClickQuestion = this.handleClickQuestion.bind(this);
  }

  componentDidMount() {
    this.saveQuestions();
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

  async handleClick() {
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
      questions,
      alternativesShuffled, indexOfQuestion, visibleButton, className } = this.state;
      const { redirect } = this.state
    return (
      <div>
        <Header />
        <TriviaQuestion
          question={ questions[indexOfQuestion] }
          scrambledQuestions={ alternativesShuffled }
          visibleButton={ this.visibleButton }
          handleClickQuestion={ this.handleClickQuestion }
          className={ className }
        />
        {visibleButton && (
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-next"
          >
            Próxima

          </button>
        )}
        { redirect && <Redirect path="/feedback" /> }
      </div>
    );
  }
}

export default GameScreen;
