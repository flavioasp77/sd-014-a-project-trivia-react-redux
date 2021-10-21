import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import '../css/borderAnswer.css';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { timerAction } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      answered: false,
      score: 0,
    };
    this.handleIndex = this.handleIndex.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  // correctAnswer
  handleIndex(correctAnswer, difficulty) {
    const { decrementTime } = this.props;
    const { score } = this.state;
    decrementTime(localStorage.getItem('timer'));
    // const { index, score } = this.state;
    // const { questions } = this.props;
    // const points = 10;
    const regex = /correct/i;
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    correct.classList.add('correct');
    wrong.forEach((ans) => ans.classList.add('wrong'));
    this.setState({ answered: true });
    // if (index < questions.length - 1) {
    //   this.setState({ index: index + 1 });
    // }
    if (regex.test(correctAnswer)) {
      const points = localStorage.getItem('timer');
      this.setState({ score: this.mathPoints(points, difficulty) });
    }
  }

  mathPoints(points, difficulty) {
    const scorePoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const total = Number(points) * scorePoints[difficulty];
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score = total;
    localStorage.setItem('state', JSON.stringify(state));
    return total;
  }

  selectAnswer() {
    const correct = document.querySelector('.correct-answer');
    correct.disabled = true;
    this.handleIndex();
    clearInterval(localStorage.getItem('idInterval'));
  }

  render() {
    const { questions } = this.props;
    const { index, answered, score } = this.state;
    return (
      <div>
        <Header score={ score } />
        <QuestionCard
          questionInfo={ questions[index] }
          handleIndex={ this.handleIndex }
        />
        <Timer answered={ answered } callback={ this.selectAnswer } />
      </div>
    );
  }
}

const mapStateToProps = ({ questions, timer }) => ({
  questions: questions.questions,
  timer: timer.time,
});

const mapDispatchToProps = (dispatch) => ({
  decrementTime: (time) => dispatch(timerAction(time)),
});

Game.propTypes = {
  decrementTime: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
