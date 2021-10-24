import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Header from '../components/Header';
import '../style/Game.css';

let control = 1;

const magicNumber = '0.33';
const timer = 30;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      disabled: false,
      correct: '',
      wrong: '',
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
      correct: 'answer-correct',
      wrong: 'answer-incorrect',
      disabled: true,
    });
  }

  shuffleQuestions(array) {
    const shufflingArray = array.map((question, i) => {
      const answerObject = {
        value: i === 0 ? 'correct' : 'wrong',
        answer: question,
        index: i === 0 ? 0 : i - 1,
      };
      question = answerObject;
      return question;
    });

    for (let i = shufflingArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const k = shufflingArray[i];
      shufflingArray[i] = shufflingArray[j];
      shufflingArray[j] = k;
    }
    return shufflingArray;
  }

  renderQuestions(answerArray) {
    const { correct, wrong, disabled } = this.state;
    const shuffledAnswers = this.shuffleQuestions(answerArray);

    return (
      <>
        { shuffledAnswers.map((answer, i) => (
          <section key={ i }>
            <br />
            <button
              type="button"
              data-testid={
                answer.value === 'correct' ? 'correct-answer'
                  : `wrong-answer-${answer.index}`
              }
              key={ i }
              disabled={ disabled }
              onClick={ this.handleClick }
              className={ answer.value === 'correct' ? correct : wrong }
            >
              { answer.answer }
            </button>
          </section>
        )) }
        { this.countdownTimer() }
      </>
    );
  }

  render() {
    const { arrayQuestions } = this.props;
    const { index } = this.state;

    if (arrayQuestions.length === 0) return <h1>... Loading</h1>;
    const objectQuestion = arrayQuestions[index];
    const {
      category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = objectQuestion;
    const answers = [correctAnswer, ...incorrectAnswers];
    return (
      <>
        <Header />
        <section>
          <section data-testid="question-category">{ category }</section>
          <br />
          <section data-testid="question-text">{ question }</section>
          <br />
          { this.renderQuestions(answers) }
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
