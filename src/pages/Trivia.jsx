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
      timer: 30,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
    this.timer();
  }

  timer() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  resetTimer() {
    this.setState({ timer: 30 });
  }

  sortArray() {
    const { questions, index } = this.state;
    const { correct_answer: correct, incorrect_answers: incorrect } = questions[index];
    return [...incorrect, correct].sort();
  }

  async fetchApi() {
    const TOKEN = 'f287138a2cd0b8e0f82ac32b307be0d26656456b95d347ae12a78a901f17f6f9';
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
    const { questions, index, className, timer } = this.state;
    return this.sortArray().map((atual, indice) => {
      const correctOrWrong = atual === questions[index].correct_answer;
      const button = (
        <button
          type="button"
          key={ indice }
          data-testid={ correctOrWrong ? 'correct-answer' : `wrong-answer-${indice}` }
          className={ className && `button-${correctOrWrong ? 'correct' : 'wrong'}` }
          onClick={ this.handleClick }
          disabled={ timer < 0 }
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
    const { questions, index, timer } = this.state;
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
        <span>
          { timer <= 0 ? this.refreshPage() : timer }
        </span>
      </main>
    );
  }
}
