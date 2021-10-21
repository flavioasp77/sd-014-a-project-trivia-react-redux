import React from 'react';
import Header from '../components/Header';

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      perguntas: [],
      indice: 0,
    };
    this.chamaApi = this.chamaApi.bind(this);
    this.sortArray = this.sortArray.bind(this);
  }

  componentDidMount() {
    this.chamaApi();
  }

  sortArray() {
    const { perguntas, indice } = this.state;
    const {
      correct_answer: correct,
      incorrect_answers: incorrect } = perguntas[indice];
    return [...incorrect, correct].sort();
  }

  async chamaApi() {
    const TOKEN = JSON.parse(localStorage.token);
    const URL = `https://opentdb.com/api.php?amount=5&encode=url3986&token=${TOKEN}`;
    const response = await fetch(URL);
    const result = await response.json();
    this.setState({
      perguntas: result.results,
    });
  }

  render() {
    const { perguntas, indice } = this.state;
    return (
      <div>
        <Header />
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
                type="submit"
                key={ i }
                data-testid={
                  atual === perguntas[indice].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${i}`
                }
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
