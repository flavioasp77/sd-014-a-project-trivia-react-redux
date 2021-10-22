import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Header from '../components/Header';

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
      remainingTime: timer,
      disabled: false,
    };
    this.countdownTimer = this.countdownTimer.bind(this);
    this.updateRemaingTime = this.updateRemaingTime.bind(this);
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

  mixBoolean(correctAnswer, incorretAnswers) {
    const { disabled } = this.state;
    return (
      <>
        <button
          type="button"
          data-testid="wrong-answer-0"
        >
          { incorretAnswers[0] }
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ disabled }
        >
          { correctAnswer }
        </button>
      </>
    );
  }

  verifyRange(RANGE, incorrectMaped, rightAnswer) {
    const arrangement = [];

    if (RANGE === RANGE05) {
      arrangement.push(incorrectMaped[0]);
      arrangement.push(rightAnswer);
      arrangement.push(incorrectMaped[1]);
      arrangement.push(incorrectMaped[2]);
      return arrangement;
    }
    if (RANGE === RANGE075) {
      arrangement.push(incorrectMaped[0]);
      arrangement.push(incorrectMaped[1]);
      arrangement.push(rightAnswer);
      arrangement.push(incorrectMaped[2]);
      return arrangement;
    }
  }

  mixMultiple(correctAnswer, incorretAnswers, randomic) {
    const { disabled } = this.state;

    const rightAnswer = (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ disabled }
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
        >
          {incorrect}
        </button>
        <br />
      </section>
    ));
    if (randomic <= RANGE05) {
      const arrangement = this.verifyRange(RANGE05, incorrectMaped, rightAnswer);
      return arrangement;
    }
    if (randomic <= RANGE075) {
      const arrangement = this.verifyRange(RANGE075, incorrectMaped, rightAnswer);
      return arrangement;
    }
    const arrangement = [...incorrectMaped, rightAnswer];
    return arrangement;
  }

  renderQuestions(objectQuestion) {
    const { type, correct_answer: correctAnswer } = objectQuestion;
    const { incorrect_answers: incorretAnswers } = objectQuestion;
    const randomic = Math.random();
    const { disabled } = this.state;
    if (type === 'boolean') {
      if (randomic > RANGE05) {
        return this.mixBoolean(correctAnswer, incorretAnswers);
      }
      return (
        <>
          <button
            type="button"
            data-testid="correct-answer"
            disabled={ disabled }
          >
            { correctAnswer }
          </button>
          <button
            type="button"
            data-testid="wrong-answer-0"
            disabled={ disabled }
          >
            { incorretAnswers[0] }
          </button>
        </>
      );
    }
    if (randomic > RANGE025) {
      return this.mixMultiple(correctAnswer, incorretAnswers, randomic);
    }
    return (
      <>
        <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
        { incorretAnswers.map((incorrect, i) => (
          <section key={ i }>
            <br />
            <button
              type="button"
              data-testid={ `wrong-answer-${i}` }
              key={ i }
              disabled={ disabled }
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
