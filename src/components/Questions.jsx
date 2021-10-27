import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StopWatch from './StopWatch';
import { salvarPontuacao } from '../redux/actions';

const MIN_SCORE = 10;
const EASY = 1;
const MEDIUM = 2;
const HARD = 3;

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerAlts: [],
      selectedAnswer: false,
      scoreCounter: 0,
      assertions: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.altShuffler = this.altShuffler.bind(this);
    this.mainQuestion = this.mainQuestion.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    const {
      incorrect_answers: incorrectAnswers,
    } = this.props;
    console.log(incorrectAnswers);
    if (incorrectAnswers) {
      this.altShuffler();
    }
  }

  altShuffler() {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = this.props;
    this.setState({
      answerAlts: [...incorrectAnswers, correctAnswer]
        .map((alt) => ({ alt, position: Math.random() }))
        .sort((a, b) => a.position - b.position).map(({ alt }) => alt),
    });
  }

  stopTimer() {
    this.setState({
      selectedAnswer: true,
    });
  }

  async handleClick(target) {
    const { difficulty, correct_answer: correctAnswer, atualizaPontos } = this.props;
    const timer = (document.getElementById('timer')).innerText;
    this.setState({ selectedAnswer: true });
    if (target.value === correctAnswer) {
      if (difficulty === 'easy') {
        await this.setState((prevState) => ({
          scoreCounter: prevState.scoreCounter + (MIN_SCORE + (EASY * timer)),
          assertions: prevState.assertions + 1,
        }));
      }
      if (difficulty === 'medium') {
        await this.setState((prevState) => ({
          scoreCounter: prevState.scoreCounter + (MIN_SCORE + (MEDIUM * timer)),
          assertions: prevState.assertions + 1,
        }));
      }
      if (difficulty === 'hard') {
        await this.setState((prevState) => ({
          scoreCounter: prevState.scoreCounter + (MIN_SCORE + (HARD * timer)),
          assertions: prevState.assertions + 1,
        }));
      }
      const { scoreCounter, assertions } = this.state;
      const { name, gravatarEmail } = this.props;
      atualizaPontos(scoreCounter, assertions);
      const player = { player: {
        name,
        assertions,
        score: scoreCounter,
        gravatarEmail,
      } };

      localStorage.setItem('player', JSON.stringify(player));
    }
  }

  mainQuestion() {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = this.props;
    const { selectedAnswer, answerAlts } = this.state;
    if (!incorrectAnswers) {
      return (
        <>
          <button
            data-testid="wrong-answer 0"
            type="button"
            className={ selectedAnswer === true ? 'notSelected' : 'incorrect' }
            disabled={ selectedAnswer }
          >
            {null}
          </button>
          <button
            data-testid="correct-answer"
            type="button"
            className={ selectedAnswer === true ? 'notSelected' : 'correct' }
            disabled={ selectedAnswer }
          >
            {null}
          </button>
        </>
      );
    }
    return (
      <main>
        { answerAlts.map((alt, index) => (
          <button
            data-testid={ alt === correctAnswer
              ? 'correct-answer'
              : `wrong-answer${index}` }
            disabled={ selectedAnswer }
            className={ selectedAnswer && alt === correctAnswer
              ? 'correct' : 'incorrect' }
            type="button"
            key={ alt }
            value={ alt }
            onClick={ ({ target }) => this.handleClick(target) }
          >
            {alt}
          </button>
        ))}
      </main>
    );
  }

  render() {
    const { selectedAnswer } = this.state;
    const {
      question,
      category,
    } = this.props;
    return (
      <main>
        <p data-testid="question-category">{`${category}`}</p>
        <p data-testid="question-text">{`${question}`}</p>
        { this.mainQuestion() }
        <StopWatch
          selectedAnswer={ selectedAnswer }
          stopTimer={ () => this.stopTimer() }
        />
      </main>
    );
  }
}

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  correct_answer: PropTypes.string.isRequired,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  question: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  atualizaPontos: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  name: state.user.name,
  gravatarEmail: state.user.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  atualizaPontos: (score, assertions) => dispatch(salvarPontuacao(score, assertions)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
