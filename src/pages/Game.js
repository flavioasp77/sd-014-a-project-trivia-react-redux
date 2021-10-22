import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getQuestions } from '../services/requests';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      questionsList: [],
    };
    this.setQuestionsInState = this.setQuestionsInState.bind(this);
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
      value: 'correct-answer', alternative: questionInfo.correct_answer };
    const WRONG_ANSWERS = questionInfo.incorrect_answers.map((alternative, index) => ({
      value: `wrong-answer-${index}`,
      alternative,
    }));
    const ALL_ANSWERS = [{ ...CORRECT_ANSWER }, ...WRONG_ANSWERS];
    const SHUFFLED_ANSWERS = this.shuffle(ALL_ANSWERS);
    return SHUFFLED_ANSWERS;
  }

  render() {
    const { currentQuestion, questionsList } = this.state;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const playerHash = md5(player.gravatarEmail).toString();

    if (questionsList.length < 1) {
      this.setQuestionsInState();
      return (<Loading />);
    }
    const questionInfo = questionsList[currentQuestion];
    const answers = this.treatAnswersData(questionInfo);
    return (
      <main>
        <Header player={ player.name } score="0" src={ `https://www.gravatar.com/avatar/${playerHash}` } />
        <div>
          <h4 data-testid="question-category">{questionInfo.category}</h4>
          <p data-testid="question-text">{questionInfo.question}</p>
          {
            answers.map(({ value, alternative }, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ value }
              >
                {alternative}
              </button>
            ))
          }
        </div>
      </main>
    );
  }
}

export default Game;
