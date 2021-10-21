import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import '../css/borderAnswer.css';
import Header from '../components/Header';
import NextQuestionBtn from '../components/NextQuestionBtn';
import Timer from '../components/Timer';
import { timerAction } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      answered: false,
    };
    this.handleIndex = this.handleIndex.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  // correctAnswer
  handleIndex() {
    const { decrementTime } = this.props;
    decrementTime(localStorage.getItem('timer'));
    // const { index, score } = this.state;
    // const { questions } = this.props;
    // const points = 10;
    // const regex = /correct/i;
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    correct.classList.add('correct');
    wrong.forEach((ans) => ans.classList.add('wrong'));
    this.setState({ answered: true });
    // if (index < questions.length - 1) {
    //   this.setState({ index: index + 1 });
    // }
    // if (regex.test(correctAnswer)) {
    //   this.setState({ score: score + points });
    // }
    this.setState({
      answered: true,
    });
  }

  selectAnswer() {
    const correct = document.querySelector('.correct-answer');
    correct.disabled = true;
    this.handleIndex();
    clearInterval(localStorage.getItem('idInterval'));
  }

  selectAnswer() {
    const correct = document.querySelector('.correct-answer');
    correct.disabled = true;
    this.handleIndex();
    clearInterval(localStorage.getItem('idInterval'));
  }

  render() {
    const { questions } = this.props;
    const { index, answered } = this.state;
    return (
      <div>
        <Header />
        <QuestionCard
          questionInfo={ questions[index] }
          handleIndex={ this.handleIndex }
        />
        {answered && <NextQuestionBtn />}
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
