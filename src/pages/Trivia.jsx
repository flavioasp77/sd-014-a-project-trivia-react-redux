import React from 'react';
import Header from '../components/Header';

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      respondido: false,
      perguntas: [],
      indice: 0,
      timer: 30,
    };
    this.chamaApi = this.chamaApi.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.computeAnswer = this.computeAnswer.bind(this);
  }

  componentDidMount() {
    const { timer } = this.state;
    const ONE_SECOND = 1000;
    const SECONDS_TO_MILLISECONDS = 1000;
    this.chamaApi();
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
    setTimeout(() => (this.computeAnswer()), timer * SECONDS_TO_MILLISECONDS);
  }

  computeAnswer() { // Function called after an answer is clicked OR, a timeout happens
    this.setState({ respondido: true });
    clearInterval(this.timerInterval);
  }

  sortArray() {
    const { perguntas, indice } = this.state;
    const {
      correct_answer: correct,
      incorrect_answers: incorrect } = perguntas[indice];
    return [...incorrect, correct].sort();
  }

  async chamaApi() { // Makes the API call to fetch the current questions
    const TOKEN = JSON.parse(localStorage.token);
    const URL = `https://opentdb.com/api.php?amount=5&encode=url3986&token=${TOKEN}`;
    const response = await fetch(URL);
    const result = await response.json();
    this.setState({
      perguntas: result.results,
    });
  }

  handleClick({ target }) {
    const { perguntas, timer } = this.state;
    const BASE_SCORE = 10;
    const difficultyLevel = ['MULTIPLIER_0', 'easy', 'medium', 'hard']; // Index 0 means multipler 0, so each subsequent value has it's index equal to the difficulty score multiplier we want. E.g: easy = 1.. Normal = 2
    const isAnswerCorrect = perguntas.find((pergunta) => decodeURIComponent(pergunta
      .correct_answer) === target.innerHTML);
    if (isAnswerCorrect) {
      const difficultyMultiplier = difficultyLevel.indexOf(difficultyLevel
        .find((diff) => diff === isAnswerCorrect.difficulty));
      const jogador = JSON.parse(localStorage.getItem('state'));
      jogador.player.score += (BASE_SCORE + (timer * difficultyMultiplier));
      localStorage.state = JSON.stringify(jogador);
    }
    this.computeAnswer();
  }

  render() {
    const { perguntas, indice, respondido, timer } = this.state;
    return (
      <div>
        <Header />
        <p>
          Time Left!!:
        </p>
        <span>{ timer }</span>
        {perguntas.length > 0
        && (
          <>
            <p data-testid="question-category">
              { decodeURIComponent(perguntas[indice].category) }
            </p>
            <p data-testid="question-text">
              { decodeURIComponent(perguntas[indice].question) }
            </p>
            {this.sortArray().map((atual, i) => (
              <button
                onClick={ this.handleClick }
                type="submit"
                key={ i }
                disabled={ respondido }
                data-testid={
                  atual === perguntas[indice].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${i}`
                }
                className={ respondido && (atual === perguntas[indice].correct_answer
                  ? 'correct'
                  : 'incorrect') }
              >
                {decodeURIComponent(atual)}
              </button>
            ))}
          </>)}
      </div>
    );
  }
}

export default Trivia;
