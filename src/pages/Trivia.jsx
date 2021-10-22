import React, { Component } from 'react';
import Header from '../components/Header';

// consertar esta parte do código que quebrou
export default class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      index: 0,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.sortArray = this.sortArray.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  sortArray() {
    const { questions, index } = this.state;
    const {
      correct_answer: correct,
      incorrect_answers: incorrect } = questions[index];
    return [...incorrect, correct].sort();
  }

  async fetchApi() {
    const TOKEN = 'c6a9bd5af74a4b3810ba761019fbfe0ee4422118ac3abf40bdd2e6b9c1dc73ea';
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${TOKEN}`);
    const result = await response.json();
    // console.log('result:', result);
    this.setState({
      questions: result.results,
    });
  }

  render() {
    const { questions, index } = this.state;
    console.log('Array questions:', questions, index);

    return (
      <main>
        <Header />
        <h1>Jogo</h1>
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{ questions[index].category }</p>
            <p data-testid="question-text">{questions[index].question}</p>
            {this.sortArray().map((atual, indice) => (
              <button
                type="button"
                key={ indice }
                data-testid={
                  atual === questions[index].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${indice}`
                }
              >
                { atual }
              </button>
            ))}
          </div>)}
      </main>
    );
  }
}
