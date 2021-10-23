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
      isShuffled: false,
      seconds: 30,
      disabled: false,
      classname: '',
      userResponse: false,
    };
    this.setQuestionsInState = this.setQuestionsInState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resetSeconds = this.resetSeconds.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.cronometerInterval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const MIN_SECONDS = 0;
    if (prevState.seconds === MIN_SECONDS) {
      this.resetSeconds();
    }
  }

  async setQuestionsInState() {
    const { results } = await getQuestions();
    this.setState({
      questionsList: results,
    });
  }

  resetSeconds() {
    this.setState({
      seconds: 0,
      disabled: true,
    });
  }

  shuffle(array) {
    this.setState({
      isShuffled: true,
    });
    return array.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
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
    const MAX_CLICKS = 4;
    if (target.getAttribute('data-testid') === 'btn-next'
      && currentQuestion < MAX_CLICKS) {
      this.setState((prevState) => ({
        isShuffled: false,
        currentQuestion: prevState.currentQuestion + 1,
        classname: '',
        userResponse: false,
        seconds: 30,
      }));
    }
    if (target.getAttribute('data-testid').includes('answer')) {
      this.setState({
        classname: 'answers-reveal',
        userResponse: true,
      });
    }
  }

  render() {
    const { currentQuestion, questionsList, disabled, seconds,
      isShuffled, classname, userResponse } = this.state;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const userHash = md5(player.gravatarEmail).toString();
    if (questionsList.length < 1) {
      this.setQuestionsInState();
      return (<Loading />);
    }
    const questionInfo = questionsList[currentQuestion];
    let answers = this.treatAnswersData(questionInfo);
    if (!isShuffled) {
      answers = this.shuffle(answers);
    }
    return (
      <>
        <Header player={ player.name } score="0" src={ `https://www.gravatar.com/avatar/${userHash}` } />
        <main className="game__container">
          <div className={ classname }>
            <h4 data-testid="question-category">{questionInfo.category}</h4>
            <p data-testid="question-text">{questionInfo.question}</p>
            {
              answers.map(({ value, alternative }, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ value }
                  onClick={ this.handleClick }
                  disabled={ disabled }
                >
                  {alternative}
                </button>
              ))
            }
            <p>
              Tempo restante:
              { seconds }
            </p>
            {
              userResponse && <Button
                dataTestId="btn-next"
                value="Next Question"
                onClick={ this.handleClick }
              />
            }
          </div>
        </main>
      </>
    );
  }
}

export default Game;
