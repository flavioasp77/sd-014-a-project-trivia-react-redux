import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getGame from '../services/apiGame';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      question: '',
      category: '',
      correctAnswer: '',
      incorrectAnswer: [],
      loading: true,
    };

    this.handleGetGame = this.handleGetGame.bind(this);
  }

  componentDidMount() {
    this.handleGetGame();
  }

  handleGetGame() {
    const token = localStorage.getItem('token');
    getGame(token)
      .then((results) => this.setState({
        question: results[0].question,
        category: results[0].category,
        correctAnswer: results[0].correct_answer,
        incorrectAnswer: results[0].incorrect_answers,
        loading: false,
      }));
  }

  render() {
    const { loading, question, category, correctAnswer, incorrectAnswer } = this.state;
    return (
      <div>
        <Header />
        {loading
          ? <Loading />
          : (
            <div>
              <h1>Question:</h1>
              <h2 data-testid="question-text">{ question }</h2>
              <h3>Category:</h3>
              <h4 data-testid="question-category">{ category }</h4>
              <form onSubmit={ this.handleSubmit }>
                <p>Alternatives:</p>
                <label htmlFor="correct-answer">
                  <li data-testid="correct-answer">{ correctAnswer }</li>
                  <input type="checkbox" id="correct-answer" />
                </label>
                { incorrectAnswer.map((answer, index) => (
                  <label htmlFor="incorrect-answer" key="incorrect-answer">
                    <li data-testid={ `wrong-answer-${index}` }>{ answer }</li>
                    <input type="checkbox" id="incorrect-answer" />
                  </label>
                ))}
                <input
                  type="submit"
                  value="Enviar"
                />
              </form>
            </div>)}
      </div>
    );
  }
}

export default Game;
