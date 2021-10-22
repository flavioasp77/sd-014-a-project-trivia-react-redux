import PropTypes from 'prop-types';
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
    this.timer = this.timer.bind(this);
    this.clickNext = this.clickNext.bind(this);
  }

  componentDidMount() {
    const { timer } = this.state;
    const SECONDS_TO_MILLISECONDS = 1000;
    this.chamaApi();
    this.timer();
    setTimeout(() => (this.computeAnswer()), timer * SECONDS_TO_MILLISECONDS);
  }

  timer() {
    const ONE_SECOND = 1000;
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
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

  handleClick() {
    this.computeAnswer();
  }

  clickNext() {
    const LAST_QUESTION = 4;
    const { indice } = this.state;
    const { history } = this.props;
    if (indice === LAST_QUESTION) history.push('/feedback');
    this.setState({ indice: indice + 1, respondido: false, timer: 30 });
    this.timer();
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
                data-testid={ atual === perguntas[indice].correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${i}` }
                className={ respondido && (atual === perguntas[indice].correct_answer
                  ? 'correct'
                  : 'incorrect') }
              >
                {decodeURIComponent(atual)}
              </button>
            ))}
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.clickNext }
            >
              Próximo

            </button>
          </>)}
      </div>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.any,
  }).isRequired,
};

export default Trivia;
