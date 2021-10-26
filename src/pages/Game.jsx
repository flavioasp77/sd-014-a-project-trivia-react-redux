import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getGravatar from '../helpers/getGravatar';
import Button from '../components/Button';
import '../styles/Game.css';

const FINAL_INDEX = 4;

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      score: 0,
      assertions: 0,
      pictureURL: '',
      questions: [],
      index: 0,
      answered: false,
      stopwatch: 30,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.sortArray = this.sortArray.bind(this);

    this.cloneLocalStorageToState = this.cloneLocalStorageToState.bind(this);
    this.initTimer = this.initTimer.bind(this);
    this.toCheck = this.toCheck.bind(this);

    this.cloneLocalStorageToState = this.cloneLocalStorageToState.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    document.title = 'Trivia-Game';
  }

  componentDidMount() {
    this.cloneLocalStorageToState();
    this.fetchApi();
  }

  componentDidUpdate() {
    const { stopwatch, answered } = this.state;
    if (stopwatch === 0 && !answered) {
      this.handleAnswer(false);
    }
  }

  async fetchApi() {
    const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const TOKEN = await fetchToken.json();
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${TOKEN.token}`);
    const { results: questions } = await response.json();
    this.setState({
      questions,
    }, () => {
      this.initTimer();
    });
  }

  nextQuestion() {
    const { index } = this.state;
    const { history } = this.props;
    if (index === FINAL_INDEX) {
      history.push('/feedback');
    }

    this.setState((prevState) => ({
      answered: false,
      index: prevState.index + 1,
      stopwatch: 30,
    }), () => { this.initTimer(); });
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

  handleClick({ target }) {
    const isCorrect = target.dataset.testid.includes('correct');
    this.handleAnswer(isCorrect);
  }

  handleAnswer(isCorrect) {
    clearInterval(this.timer);

    this.setState((prevState) => ({
      answered: true,
      score: isCorrect ? this.calculateScore(prevState.score) : prevState.score,
      assertions: isCorrect ? prevState.assertions + 1 : prevState.assertions,
    }), () => {
      const { name, score, gravatarEmail, assertions } = this.state;
      const gameState = {
        player: {
          name,
          assertions,
          score,
          gravatarEmail,
        },
      };
      localStorage.setItem('state', JSON.stringify(gameState));
    });
  }

  calculateScore(oldScore) {
    const { questions, index, stopwatch } = this.state;
    const levels = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const BASE_SCORE = 10;

    return oldScore + BASE_SCORE + (stopwatch * levels[questions[index].difficulty]);
  }

  initTimer() {
    const SECOND_TIME = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        stopwatch: prevState.stopwatch - 1,
      }));
    }, SECOND_TIME);
  }

  toCheck() {
    console.log('botao desabilitar');
    console.log('mostrar resposta correto');
  }

  render() {
    const { name, score, pictureURL, questions, index, answered, stopwatch } = this.state;
    return (
      <>
        <Header name={ name } score={ score } pictureURL={ pictureURL } />
        <main>
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
                  onClick={ this.handleClick }
                  disabled={ answered }
                  className={ answered ? 'clicked' : undefined }
                >
                  { atual }
                </button>
              ))}
            </div>)}
          { answered && index <= FINAL_INDEX && (
            <Button
              label={ index < FINAL_INDEX ? 'Próxima' : 'Ver Resultados' }
              dataTestid="btn-next"
              onClick={ this.nextQuestion }
            />)}
          <div>
            Tempo restante:
            {' '}
            { stopwatch }
          </div>
        </main>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
