import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';
import '../styles/Game.css';
import { updatePlayer, fetchQuestions } from '../redux/actions';

const FINAL_INDEX = 4;

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      assertions: 0,
      index: 0,
      answered: false,
      stopwatch: 30,
    };

    this.sortArray = this.sortArray.bind(this);

    this.initTimer = this.initTimer.bind(this);

    this.handleAnswer = this.handleAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    document.title = 'Trivia-Game';
  }

  componentDidMount() {
    const { dispatchFetchQuestions } = this.props;
    this.initTimer();
    dispatchFetchQuestions();
  }

  componentDidUpdate() {
    const { stopwatch, answered } = this.state;
    if (stopwatch === 0 && !answered) {
      this.handleAnswer(false);
    }
  }

  nextQuestion() {
    const { index, score, assertions } = this.state;
    const { history, dispatchUpdatePlayer, name, pictureURL } = this.props;
    dispatchUpdatePlayer({ score, assertions, name, pictureURL });
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
    const { index } = this.state;
    const { questions } = this.props;
    const {
      correct_answer: correct,
      incorrect_answers: incorrect } = questions[index];
    return [...incorrect, correct].sort();
  }

  // cloneLocalStorageToState() {
  //   const playerInfo = JSON.parse(localStorage.getItem('state'));
  //   const { player: { name, score, gravatarEmail } } = playerInfo;
  //   this.setState({
  //     name,
  //     score,
  //     pictureURL: getGravatar(gravatarEmail),
  //   });
  // }

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
    }));
  }
  // () => {
  //   const { name, score, gravatarEmail, assertions } = this.state;
  //   const gameState = {
  //     player: {
  //       name,
  //       assertions,
  //       score,
  //       gravatarEmail,
  //     },
  //   };
  // localStorage.setItem('state', JSON.stringify(gameState));

  calculateScore(oldScore) {
    const { index, stopwatch } = this.state;
    const { questions } = this.props;
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

  render() {
    const { score, index, answered, stopwatch } = this.state;
    const { name, questions, pictureURL } = this.props;
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
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  pictureURL: PropTypes.string.isRequired,
  dispatchFetchQuestions: PropTypes.func.isRequired,
  dispatchUpdatePlayer: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    questions: state.questions,
    name: state.player.name,
    pictureURL: state.player.pictureURL,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdatePlayer: (player) => dispatch(updatePlayer(player)),
    dispatchFetchQuestions: () => dispatch(fetchQuestions()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
