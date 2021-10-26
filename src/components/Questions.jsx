import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerAlts: [],
      selectedAnswer: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.altShuffler = this.altShuffler.bind(this);
    this.mainQuestion = this.mainQuestion.bind(this);
  }

  componentDidMount() {
    const {
      incorrect_answers: incorrectAnswers,
    } = this.props;
    if (incorrectAnswers) {
      this.altShuffler();
    }
  }

  altShuffler() {
    const {
      incorrect_answers: incorrectAnswers,
    } = this.props;
    const { answerAlts } = this.state;

    this.setState({
      answerAlts: [incorrectAnswers]
        .map((alt) => ({ alt, position: Math.random() }))
        .sort((a, b) => a.position - b.position).map(({ alt }) => alt),
    });
    console.log(answerAlts);
  }

  handleClick() {
    this.setState({
      selectedAnswer: true,
    });
  }

  mainQuestion() {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = this.props;
    const { selectedAnswer } = this.state;
    if (!incorrectAnswers) {
      return (
        <button
          data-testid="`wrong-answer 0"
          type="button"
        >
          { null }
        </button>
      );
    }
    return (
      <main>
        { incorrectAnswers.map((alt, index) => (
          <button
            data-testid={ `wrong-answer${index}` }
            disabled={ selectedAnswer }
            className={ selectedAnswer && alt === correctAnswer
              ? 'correct' : 'border: 3px solid rgb(255,0,0);' }
            type="button"
            key={ alt }
            onClick={ this.handleClick }
          >
            {alt}
          </button>
        ))}
      </main>
    );
  }

  render() {
    const {
      question,
      category,
      correct_answer: correctAnswer,
    } = this.props;
    const { selectedAnswer } = this.state;
    return (
      <main>
        <p data-testid="question-category">{`${category}`}</p>
        <p data-testid="question-text">{`${question}`}</p>
        <button
          data-testid="correct-answer"
          disabled={ selectedAnswer }
          style={ selectedAnswer
            ? 'correct' : 'border: 3px solid rgb(255,0,0);' }
          type="button"
          key={ correctAnswer }
          onClick={ this.handleClick }
        >
          {correctAnswer}
        </button>
        { this.mainQuestion() }
      </main>
    );
  }
}

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  correct_answer: PropTypes.string.isRequired,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  question: PropTypes.string.isRequired,
};

export default Questions;
