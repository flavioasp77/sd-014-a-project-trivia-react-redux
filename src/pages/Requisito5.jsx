import React from 'react';

class RequisitoCinco extends React.Component {
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
    const TOKEN = '9f745c94239dfe9e6d24b224b02ed015bdfea06fb02eebf42b668346fee9d129';
    const URL = `https://opentdb.com/api.php?amount=5&token=${TOKEN}`;
    const response = await fetch(URL);
    const result = await response.json();
    this.setState({
      perguntas: result.results,
    });
  }

  render() {
    const { perguntas, indice } = this.state;
    return (
      <>
        { console.log(perguntas) }
        {perguntas.length > 0
        && (
          <>
            <p data-testid="question-category">
              { perguntas[indice].category }
            </p>
            <p data-testid="question-text">
              { perguntas[indice].question }
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
                {atual}
              </button>
            ))}
          </>)}
      </>
    );
  }
}

export default RequisitoCinco;
