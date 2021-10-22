import React, { Component } from 'react';
import Header from '../components/Header';

import '../style/style.css';

export default class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      index: 0,
      className: false,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  sortArray() {
    const { questions, index } = this.state;
    const { correct_answer: correct, incorrect_answers: incorrect } = questions[index];
    return [...incorrect, correct].sort();
  }

  async fetchApi() {
    const TOKEN = '65553a27dab8a0319076652051e7fd436618c2ad3ee3cee08e74dcda21ce6ecd';
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${TOKEN}`);
    const result = await response.json();
    // console.log('result:', result);
    this.setState({
      questions: result.results,
    });
  }

  handleClick() {
    this.setState({ className: true });
  }

  styleSelectedMoreAlternatives() {
    const { questions, index, className } = this.state;
    return this.sortArray().map((atual, indice) => {
      const correctOrWrong = atual === questions[index].correct_answer;
      const button = (
        <button
          type="button"
          key={ indice }
          data-testid={ correctOrWrong ? 'correct-answer' : `wrong-answer-${indice}` }
          className={ className && `button-${correctOrWrong ? 'correct' : 'wrong'}` }
          onClick={ this.handleClick }
        >
          {atual}
        </button>
      );
      console.log(className);
      return button;
    });
  }

  refreshPage() {
    window.location.reload();
  }

  nextQuestion() {
    const { className } = this.state;
    if (className) {
      const button = (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.refreshPage }
        >
          Próxima
        </button>
      );
      return button;
    }
  }

  render() {
    const { questions, index } = this.state;
    // console.log('Array questions:', questions, index);

    return (
      <main>
        <Header />
        <h1>Jogo</h1>
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[index].category}</p>
            <p data-testid="question-text">{questions[index].question}</p>
            <div>
              {this.styleSelectedMoreAlternatives()}
            </div>
            <div>
              {this.nextQuestion()}
            </div>
          </div>
        )}
      </main>
    );
  }
}
