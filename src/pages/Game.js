import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import '../css/borderAnswer.css';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.handleIndex = this.handleIndex.bind(this);
  }

  // correctAnswer
  handleIndex() {
    // const { index, score } = this.state;
    // const { questions } = this.props;
    // const points = 10;
    // const regex = /correct/i;
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    correct.classList.add('correct');

    wrong.forEach((ans) => ans.classList.add('wrong'));
    // if (index < questions.length - 1) {
    //   this.setState({ index: index + 1 });
    // }
    // if (regex.test(correctAnswer)) {
    //   this.setState({ score: score + points });
    // }
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    return (
      <div>
        <Header />
        <QuestionCard
          questionInfo={ questions[index] }
          handleIndex={ this.handleIndex }
        />

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
