import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import QuestionCard from '../components/QuestionCard';
import '../css/borderAnswer.css';
import Header from '../components/Header';
import Timer from '../components/Timer';
import NextQstButton from '../components/NextQstButton';

class Game extends Component {
  constructor() {
    super();

    const { player } = JSON.parse(localStorage.getItem('state'));
    this.state = {
      index: 0,
      answered: false,
      score: player.score,
      assertions: 0,
      timeReset: false,
      feedback: false,
    };
    this.handleIndex = this.handleIndex.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleNextQuest = this.handleNextQuest.bind(this);
    this.handleBtnColor = this.handleBtnColor.bind(this);
  }

  componentDidMount() {
    const halfMinute = 30;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) localStorage.setItem('ranking', JSON.stringify({}));
    sessionStorage.setItem('timer', halfMinute);
  }

  // correctAnswe r
  handleIndex(correctAnswer, difficulty) {
    const regex = /correct/i;
    if (regex.test(correctAnswer)) {
      const { assertions } = this.state;
      const time = Number(sessionStorage.getItem('timer'));
      const newScore = this.mathPoints(time, difficulty);
      this.setState({
        score: newScore,
        assertions: assertions + 1,
      });
    }
    this.handleBtnColor();
  }

  mathPoints(time, difficulty) {
    const scorePoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const sum = time * scorePoints[difficulty];
    const state = JSON.parse(localStorage.getItem('state'));
    const assert = state.player.assertions;
    state.player.assertions = assert + 1;
    const total = state.player.score + sum;
    state.player.score = total;
    localStorage.setItem('state', JSON.stringify(state));
    return total;
  }

  handleBtnColor() {
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    correct.classList.add('correct');
    wrong.forEach((ans) => ans.classList.add('wrong'));
    this.setState({ answered: true });
    correct.disabled = true;
  }

  async handleNextQuest() {
    const { index } = this.state;
    const { questions } = this.props;
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (index < questions.length - 1) {
      await this.setState({
        index: index + 1,
        answered: false,
        timeReset: true,
      });
      correct.classList.remove('correct');
      correct.disabled = false;
      wrong.forEach((ans) => ans.classList.remove('wrong'));
    } else {
      const { player } = JSON.parse(localStorage.getItem('state'));
      const newPlayer = {
        [`player${Object.keys(ranking).length}`]: player,
      };
      localStorage.setItem('ranking', JSON.stringify({ ...ranking, ...newPlayer }));
      await this.setState({
        feedback: true,
      });
    }
    this.setState({ timeReset: false });
  }

  selectAnswer() {
    this.handleIndex();
    clearInterval(sessionStorage.getItem('idInterval'));
  }

  render() {
    const { questions } = this.props;
    const { index, answered, timeReset, score, feedback } = this.state;
    if (feedback) return <Redirect to="/feedback" />;
    return (
      <div>
        <Header score={ score } />
        <QuestionCard
          questionInfo={ questions[index] }
          handleIndex={ this.handleIndex }
        />
        {!timeReset && <Timer answered={ answered } callback={ this.selectAnswer } />}
        {answered && <NextQstButton onClick={ this.handleNextQuest } />}
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions: questions.questions,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, null)(Game);
