import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from './Button';
import { setPlayerData } from '../redux/actions';
import '../styles/QuestionCard.css';

const NO_ANSWER = '';
const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: NO_ANSWER,
      timer: 30,
      click: false,
      assertions: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  componentDidMount() {
    this.handleTimer();
  }

  selectedClickFalse() {
    this.setState({ click: false });
  }

  handleTimer() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));

      // stop timer
      const { timer } = this.state;
      const ZERO = 0;
      if (timer === ZERO) {
        clearInterval(this.interval);
        this.setState({ click: true });
        this.showNext();
      }
    }, ONE_SECOND);
  }

  handleClick(answer) {
    const rightButton = document.querySelector('[data-testid="correct-answer"]');
    const wrongButtons = document.querySelectorAll('[data-testid*="wrong-answer"]');
    rightButton.className = CORRECT_ANSWER;
    wrongButtons.forEach((button) => { button.className = WRONG_ANSWER; });

    clearInterval(this.interval); // pause timer
    this.calculateScore(answer);
    this.setState({ answer });
  }

  handleClickNext(isCorrect) {
    const { callback } = this.props;
    const buttons = document.querySelectorAll('[data-testid*="-answer"]');
    buttons.forEach((button) => { button.className = 'standard-button'; });

    this.setState({ timer: 30 }); // reset timer
    this.handleTimer();
    this.setState({ answer: NO_ANSWER, click: false });
    callback(isCorrect);
  }

  showNext(show) {
    const { answer } = this.state;
    return show && (
      <Button
        onClick={ () => this.handleClickNext(answer === CORRECT_ANSWER) }
        submit={ false }
        testid="btn-next"
        value="Próxima"
      />
    );
  }

  calculateScore(answer) {
    const timer = 1;
    const scoreCorrect = 10;
    const { data: { difficulty } } = this.props;

    if (answer === CORRECT_ANSWER) {
      const WEIGHTS = ['easy', 'medium', 'hard'];
      const weight = WEIGHTS.indexOf(difficulty) + 1;
      const sumPoints = scoreCorrect + (timer * weight);

      const { player, dispatchPayload } = this.props;
      player.assertions += 1;
      player.score += sumPoints;
      dispatchPayload(player);
      this.setState((prevState) => ({
        score: prevState.score + sumPoints,
        assertions: prevState.assertions + 1,
      }));
    }
    this.setState({ click: true });
  }

  htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  }

  render() {
    const { answer, timer, click } = this.state;
    const {
      data: { category, question, correctAnswer, incorrectAnswers, options },
    } = this.props;

    return (
      <div>
        <div>
          <p data-testid="question-category">
            { category }
          </p>
          <p>{ timer }</p>
          <p data-testid="question-text">
            { this.htmlDecode(question) }
          </p>
        </div>
        <div>
          { options.map((option, index) => {
            const isCorrect = option === correctAnswer;
            return (<Button
              key={ index }
              className="standard-button"
              onClick={ () => this.handleClick(
                isCorrect ? CORRECT_ANSWER : WRONG_ANSWER,
              ) }
              submit={ false }
              testid={
                isCorrect
                  ? CORRECT_ANSWER
                  : `wrong-answer-${incorrectAnswers.indexOf(option)}`
              }
              value={ this.htmlDecode(option) }
              disabled={ click }
            />);
          }) }
        </div>
        <div>
          { this.showNext(answer !== NO_ANSWER || timer === 0) }
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  callback: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
  dispatchPayload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPayload: (payload) => dispatch(setPlayerData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
