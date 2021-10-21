import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      score: 0,
    };
    this.handleIndex = this.handleIndex.bind(this);
  }

  handleIndex(correctAnswer) {
    const { index, score } = this.state;
    const { questions } = this.props;
    const points = 10;
    const regex = /correct/i;
    if (index < questions.length - 1) {
      this.setState({ index: index + 1 });
    }
    if (regex.test(correctAnswer)) {
      this.setState({ score: score + points });
    }
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    return (
      <div>
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
