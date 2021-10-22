import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getQuestions } from '../services/requests';
import Timer from '../components/Timer';

import '../css/Game.css';

const correctAnswer = 'correct-answer';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      questionsList: [],
    };
    this.setQuestionsInState = this.setQuestionsInState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async setQuestionsInState() {
    const { results } = await getQuestions();
    this.setState({
      questionsList: results,
    });
  }

  shuffle(array) {
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
    const SHUFFLED_ANSWERS = this.shuffle(ALL_ANSWERS);
    return SHUFFLED_ANSWERS;
  }

  handleClick({ target }) {
    target.parentElement.className = 'answers-reveal';
  }

  render() {
    const { currentQuestion, questionsList } = this.state;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const userHash = md5(player.gravatarEmail).toString();

    if (questionsList.length < 1) {
      this.setQuestionsInState();
      return (<Loading />);
    }
    const questionInfo = questionsList[currentQuestion];
    const answers = this.treatAnswersData(questionInfo);
    return (
      <>
        <Header player={ player.name } score="0" src={ `https://www.gravatar.com/avatar/${userHash}` } />
        <main className="game__container">
          <div>
            <h4 data-testid="question-category">{questionInfo.category}</h4>
            <p data-testid="question-text">{questionInfo.question}</p>
            {
              answers.map(({ value, alternative }, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ value }
                  onClick={ this.handleClick }
                >
                  {alternative}
                </button>
              ))
            }
            <Timer />
          </div>
        </main>
      </>
    );
  }
}

export default Game;
