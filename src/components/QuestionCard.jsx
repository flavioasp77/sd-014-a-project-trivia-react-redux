import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false,
      seconds: 30,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.counter = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.counter);
    }
  }

  handleClick() {
    this.setState({ showAnswer: true });
  }

  render() {
    const { data } = this.props;
    const { showAnswer, seconds } = this.state;

    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      question,
    } = data;

    return (
      <div className="question-card">
        <div className="question-container">
          <p className="question-category" data-testid="question-category">
            {category}
          </p>
          <p className="question-text" data-testid="question-text">
            {question}
          </p>
          <p className="timer">{`Tempo: ${seconds}`}</p>
        </div>
        <div className="answers-container">
          <button
            className={ seconds === 0 || showAnswer ? 'answer correct' : 'answer' }
            data-testid="correct-answer"
            onClick={ this.handleClick }
            type="button"
            disabled={ seconds === 0 }
          >
            {correct}
          </button>
          {incorrect.map((answer, index) => (
            <button
              className={ seconds === 0 || showAnswer ? 'answer wrong' : 'answer' }
              data-testid={ `wrong-answer-${index}` }
              key={ `${answer}-${index}` }
              onClick={ this.handleClick }
              type="button"
              disabled={ seconds === 0 }
            >
              {answer}
            </button>
          ))}
        </div>

      </div>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionCard;
