import React, { Component } from 'react';
import { getQuestions } from '../services/triviaAPI';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setQuestions();
  }

  async setQuestions() {
    const results = await getQuestions();
    this.setState({ questions: results.results });
  }

  handleClick() {
    // const { questions } = this.state;
    // const corrects = questions.reducer((acc,quest) => {

    // }, {})
  }

  shuffleQuestions(array) {
    // From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length;
    let randomIndex = 0;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        {
          questions.map((question, index) => {
            const allAnswers = [...question.incorrect_answers, question.correct_answer];
            this.shuffleQuestions(allAnswers);
            return (
              <div key={ index }>
                <p>
                  Category:
                  <span data-testid="question-category">{ question.category }</span>
                </p>
                <p>
                  Question:
                  <span data-testid="question-text">{ question.question }</span>
                </p>
                <div id={ index }>
                  {allAnswers.map((ele, i) => (
                    <button
                      key={ i }
                      type="button"
                      data-testid={ ele === question.correct_answer ? 'correct-answer'
                        : 'wrong-answer' }
                      onClick={ this.handleClick }
                    >
                      { ele }
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Questions;
