import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { sumScore } from '../services/localStorage';
import endQuestion from '../services/questions';
import Answer from './Answer';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      time: 30,
    };

    this.setTime = this.setTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setTime();
  }

  setTime() {
    const ONE_SECOND = 1000;
    setTimeout(this.setTime, ONE_SECOND);
    const { time } = this.state;
    const newTime = time - 1;
    if (time === 0) {
      endQuestion();
      return 0;
    }
    this.setState({ time: newTime });
  }

  handleClick({ target: { name } }) {
    const { time } = this.state;
    const { question: { difficulty } } = this.props;
    endQuestion();
    if (name === 'correct-answer') {
      sumScore(difficulty, time);
    }
  }

  render() {
    const { question, answers } = this.props;
    const { time } = this.state;
    return (
      <section>
        <div>
          <p
            data-testid="question-category"
          >
            { question.category }
          </p>
          <p
            data-testid="question-text"
          >
            { question.question }
          </p>
        </div>
        <div>
          <ul>
            { answers.map((answer, index) => (
              <Answer key={ index } answer={ answer } onClick={ this.handleClick } />
            )) }
          </ul>
        </div>
        <div>
          <p>
            Time Remaining:
            {' '}
            { time }
          </p>
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  answers: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.shape({
      map: PropTypes.func,
    }),
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
