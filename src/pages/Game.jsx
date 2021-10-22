import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import verifyRange from '../utils/mix';
import Header from '../components/Header';
import '../style/Game.css';

let control = 1;

const RANGE025 = 0.25;
const RANGE05 = 0.5;
const RANGE075 = 0.75;
const magicNumber = '0.33';
const timer = 30;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      //  remainingTime: timer,
      disabled: false,
      colorRight: '',
      colorWrong: '',
    };
    this.countdownTimer = this.countdownTimer.bind(this);
    this.updateRemaingTime = this.updateRemaingTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateRemaingTime(time) {
    const { remainingTime } = this.state;

    if (time === 0 && control === 1) {
      this.setState({
        remainingTime: 0,
        disabled: true,
      });
      control = remainingTime;
    }
    console.log(remainingTime);
  }

  countdownTimer() {
    return (
      <section>
        <CountdownCircleTimer
          isPlaying
          duration={ timer }
          colors={ [
            ['#004777', magicNumber],
            ['#F7B801', magicNumber],
            ['#A30000', magicNumber],
          ] }
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) this.updateRemaingTime(0);
            return remainingTime;
          } }
        </CountdownCircleTimer>
      </section>
    );
  }

  handleClick() {
    this.setState({
      colorRight: 'answer-correct',
      colorWrong: 'answer-incorrect',
    });
  }

  mixBoolean(correctAnswer, incorretAnswers) {
    const { disabled, colorRight, colorWrong } = this.state;
    return (
      <>
        <button
          type="button"
          data-testid="wrong-answer-0"
          onClick={ this.handleClick }
          className={ colorWrong }
        >
          { incorretAnswers[0] }
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ disabled }
          onClick={ this.handleClick }
          className={ colorRight }
        >
          { correctAnswer }
        </button>
      </>
    );
  }

  mixMultiple(correctAnswer, incorretAnswers, randomic) {
    const { disabled, colorRight, colorWrong } = this.state;

    const rightAnswer = (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ disabled }
          className={ colorRight }
          onClick={ this.handleClick }
        >
          { correctAnswer }
        </button>
        <br />
      </>
    );

    const incorrectMaped = incorretAnswers.map((incorrect, i) => (
      <section key={ i }>
        <button
          type="button"
          data-testid={ `wrong-answer-${i}` }
          key={ i }
          disabled={ disabled }
          onClick={ this.handleClick }
          className={ colorWrong }
        >
          { incorrect }
        </button>
        <br />
      </section>
    ));
    if (randomic <= RANGE05) {
      const arrangement = verifyRange(RANGE05, incorrectMaped, rightAnswer);
      return arrangement;
    }
    if (randomic <= RANGE075) {
      const arrangement = verifyRange(RANGE075, incorrectMaped, rightAnswer);
      return arrangement;
    }
    const arrangement = [...incorrectMaped, rightAnswer];
    return arrangement;
  }

  renderBooleanNotMixed(correctAnswer, incorretAnswers) {
    const { colorRight, colorWrong } = this.state;
    return (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
          className={ colorRight }
        >
          { correctAnswer }
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          onClick={ this.handleClick }
          className={ colorWrong }
        >
          { incorretAnswers[0] }
        </button>
      </>
    );
  }

  renderQuestions(objectQuestion) {
    const { colorRight, colorWrong } = this.state;
    const { type, correct_answer: correctAnswer } = objectQuestion;
    const { incorrect_answers: incorretAnswers } = objectQuestion;
    const randomic = Math.random();
    const { disabled } = this.state;
    if (type === 'boolean') {
      if (randomic > RANGE05) {
        return this.mixBoolean(correctAnswer, incorretAnswers);
      }
      this.renderBooleanNotMixed(correctAnswer, incorretAnswers);
    }
    if (randomic > RANGE025) {
      return this.mixMultiple(correctAnswer, incorretAnswers, randomic);
    }
    return (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
          className={ colorRight }
          disabled={ disabled }
        >
          { correctAnswer }
        </button>
        { incorretAnswers.map((incorrect, i) => (
          <section key={ i }>
            <br />
            <button
              type="button"
              data-testid={ `wrong-answer-${i}` }
              key={ i }
              disabled={ disabled }
              onClick={ this.handleClick }
              className={ colorWrong }
            >
              {incorrect}
            </button>
          </section>
        )) }
      </>
    );
  }

  render() {
    const { arrayQuestions } = this.props;
    const { index } = this.state;

    if (arrayQuestions.length === 0) return <h1>... Loading</h1>;
    const objectQuestion = arrayQuestions[index];
    const { category, question } = objectQuestion;
    return (
      <>
        <Header />
        <section>
          <section data-testid="question-category">{ category }</section>
          <br />
          <section data-testid="question-text">{ question }</section>
          <br />
          { this.renderQuestions(objectQuestion) }
          { this.countdownTimer() }
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    arrayQuestions: state.questionsReducer.questions,
  };
}

Game.propTypes = {
  arrayQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Game);
