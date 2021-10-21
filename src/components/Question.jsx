import PropTypes from 'prop-types';
import React, { Component } from 'react';
import endQuestion from '../services/questions';

class Question extends Component {
  constructor() {
    super();

    this.setTime = this.setTime.bind(this);

    this.state = {
      time: 30,
    };
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
              <li
                key={ index }
              >
                { answer }
              </li>
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
    incorrect_answers: PropTypes.shape({
      map: PropTypes.func,
    }),
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
