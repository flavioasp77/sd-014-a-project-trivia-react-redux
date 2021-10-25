import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Button from '../components/Button';
import { getQuestions } from '../services/requests';
import '../css/Game.css';

const correctAnswer = 'correct-answer';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      questionsList: [],
      seconds: 30,
      disabled: false,
      classname: '',
      userResponse: false,
    };
    this.setQuestionsInState = this.setQuestionsInState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resetSeconds = this.resetSeconds.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.createTimer = this.createTimer.bind(this);
  }

  componentDidMount() {
    this.createTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentQuestion } = this.state;
    const MIN_SECONDS = 1;
    if (prevState.seconds === MIN_SECONDS) {
      this.resetSeconds();
    }
    if (prevState.currentQuestion !== currentQuestion) {
      this.createTimer();
    }
  }

  async setQuestionsInState() {
    const { results } = await getQuestions();
    this.setState({
      questionsList: results,
    });
  }

  createTimer() {
    const ONE_SECOND = 1000;
    this.cronometerInterval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  resetSeconds() {
    this.setState({
      seconds: 0,
      disabled: true,
      userResponse: true,
    });
    clearInterval(this.cronometerInterval);
  }

  shuffle(array) {
    const answers = array.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    this.setState({
      isShuffled: true,
      answers,
    });
  }

  treatAnswersData(questionInfo) {
    const CORRECT_ANSWER = {
      value: correctAnswer, alternative: questionInfo.correct_answer,
    };
    const WRONG_ANSWERS = questionInfo.incorrect_answers.map((alternative, index) => ({
      value: `wrong-answer-${index}`,
      alternative,
    }));
    const ALL_ANSWERS = [{ ...CORRECT_ANSWER }, ...WRONG_ANSWERS];
    return ALL_ANSWERS;
  }

  handleClick({ target }) {
    const { currentQuestion } = this.state;
    const BUTTON_ID = target.getAttribute('data-testid');
    const MAX_CLICKS = 4;
    if (BUTTON_ID === 'btn-next'
      && currentQuestion < MAX_CLICKS) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        classname: '',
        userResponse: false,
        seconds: 30,
        disabled: false,
        isShuffled: false,
      }));
    }
    if (BUTTON_ID.includes('answer')) {
      this.setState({
        classname: 'answers-reveal',
        userResponse: true,
      });
      clearInterval(this.cronometerInterval);
    }
  }

  render() {
    const { currentQuestion, questionsList, disabled, seconds,
      isShuffled, classname, userResponse, answers } = this.state;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const userHash = md5(player.gravatarEmail).toString();
    if (questionsList.length < 1) {
      this.setQuestionsInState();
      return (<Loading />);
    }
    const questionInfo = questionsList[currentQuestion];
    const treatedAnswers = this.treatAnswersData(questionInfo);
    if (!isShuffled) { this.shuffle(treatedAnswers); }
    return (
      <>
        <Header player={ player.name } score="0" src={ `https://www.gravatar.com/avatar/${userHash}` } />
        <main className="game__container">
          <div className={ classname }>
            <div className="game__headings">
              <h4 data-testid="question-category">{questionInfo.category}</h4>
              <p data-testid="question-text">{questionInfo.question}</p>
            </div>
            <div className="game__alternatives">
              { answers
              && (answers.map(({ value, alternative }, index) => (
                <Button
                  key={ index }
                  dataTestId={ value }
                  onClick={ this.handleClick }
                  disabled={ disabled }
                  value={ alternative }
                />
              ))) }
            </div>
            <div className="game__options">
              <p>
                Tempo restante:
                { seconds }
              </p>
              { userResponse && <Button
                dataTestId="btn-next"
                value="Next Question"
                className="next-question-btn"
                onClick={ this.handleClick }
              /> }
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Game;
