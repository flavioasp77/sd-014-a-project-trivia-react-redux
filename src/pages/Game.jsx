import React from 'react';
import Header from '../components/Header';
import getGravatar from '../helpers/getGravatar';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      score: 0,
      pictureURL: '',
      questions: [],
      index: 0,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.sortArray = this.sortArray.bind(this);

    this.cloneLocalStorageToState = this.cloneLocalStorageToState.bind(this);

    document.title = 'Trivia-Game';
  }

  componentDidMount() {
    this.cloneLocalStorageToState();
    this.fetchApi();
  }

  async fetchApi() {
    const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const TOKEN = await fetchToken.json();
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${TOKEN.token}`);
    const { results: questions } = await response.json();
    this.setState({
      questions,
    });
  }

  sortArray() {
    const { questions, index } = this.state;
    const {
      correct_answer: correct,
      incorrect_answers: incorrect } = questions[index];
    return [...incorrect, correct].sort();
  }

  cloneLocalStorageToState() {
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, gravatarEmail } } = playerInfo;
    this.setState({
      name,
      score,
      pictureURL: getGravatar(gravatarEmail),
    });
  }

  render() {
    const { name, score, pictureURL, questions, index } = this.state;
    return (
      <>
        <Header name={ name } score={ score } pictureURL={ pictureURL } />
        <main>
          <p>Game</p>
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
      </>
    );
  }
}

export default Game;
