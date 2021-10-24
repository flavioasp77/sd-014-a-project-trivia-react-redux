import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false,
      score: 0,
      seconds: 30,
    };
    this.setScore = this.setScore.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.counter = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { seconds, score } = this.state;
    if (seconds === 0) {
      clearInterval(this.counter);
    }
    if (score !== 0) {
      const player = JSON.parse(localStorage.getItem('player'));
      player.score = score;
      localStorage.setItem('player', JSON.stringify(player));
    }
  }

  setScore(difficulty) {
    if (difficulty === 'easy') {
      this.calculateScore({ qstnLevel: 1 });
    } if (difficulty === 'medium') {
      this.calculateScore({ qstnLevel: 2 });
    } if (difficulty === 'hard') {
      this.calculateScore({ qstnLevel: 3 });
    }
  }

  calculateScore(qstnLevelPoints) {
    const { score, seconds } = this.state;
    const basePoints = { base: 10 };
    console.log(qstnLevelPoints.qstnLevel);
    const anwserPoints = Number(basePoints.base) + (qstnLevelPoints.qstnLevel);
    console.log(anwserPoints, seconds);
    this.updateState({
      score: score + (anwserPoints * seconds),
    });
  }

  updateState(state) {
    this.setState(state);
  }

  handleClick(difficulty) {
    this.setState({ showAnswer: true });
    if (difficulty !== null) {
      this.setScore(difficulty);
    }
    const { score } = this.state;
    console.log(score);
  }

  render() {
    const { data } = this.props;
    const { showAnswer, seconds } = this.state;

    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      question,
      difficulty,
    } = data;

    return (
      <div className="question-card">
        <div className="question-container">
          <p className="question-category" data-testid="question-category">
            {category}
          </p>
          <p className="question-text" data-testid="question-text">
            {question}
          </p>
          <p className="timer">{`Tempo: ${seconds}`}</p>
        </div>
        <div className="answers-container">
          <button
            className={ seconds === 0 || showAnswer ? 'answer correct' : 'answer' }
            data-testid="correct-answer"
            onClick={ () => this.handleClick(difficulty) }
            type="button"
            disabled={ seconds === 0 }
          >
            {correct}
          </button>
          {incorrect.map((answer, index) => (
            <button
              className={ seconds === 0 || showAnswer ? 'answer wrong' : 'answer' }
              data-testid={ `wrong-answer-${index}` }
              key={ `${answer}-${index}` }
              onClick={ () => this.handleClick(null) }
              type="button"
              disabled={ seconds === 0 }
            >
              {answer}
            </button>
          ))}
        </div>

      </div>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionCard;
