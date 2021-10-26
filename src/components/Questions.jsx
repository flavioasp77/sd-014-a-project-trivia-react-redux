import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerAlts: [],
      selectedAnswer: false,
      scoreCounter: 0,
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
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = this.props;
    const { answerAlts } = this.state;

    this.setState({
      answerAlts: [...incorrectAnswers, correctAnswer]
        .map((alt) => ({ alt, position: Math.random() }))
        .sort((a, b) => a.position - b.position).map(({ alt }) => alt),
    });
    console.log(answerAlts);
  }

  handleClick(event) {
    this.setState({
      selectedAnswer: true,
    });
    console.log('nivel', event.target.value);
    const numeroFixo = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    if (event.target === 'correct-answer');
    if (event.target.value === 'easy') this.setState({ scoreCounter: numeroFixo + (1 * easy)});
    if (event.target.value === 'medium') this.setState({scoreCounter: numeroFixo + (1 * medium)});
    if (event.target.value === 'hard') this.setState({ scoreCounter: numeroFixo + (1 * hard)  });
  }

  mainQuestion() {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      difficulty,
    } = this.props;
    const { selectedAnswer, answerAlts } = this.state;
    if (!incorrectAnswers) {
      return (
        <>
          <button
            data-testid="wrong-answer 0"
            type="button"
            value={ difficulty }
          >
            {null}
          </button>
          <button
            data-testid="correct-answer"
            type="button"
            value={ difficulty }
          >
            {null}
          </button>

        </>
      );
    }
    return (
      <main>
        { answerAlts.map((alt, index) => (
          <button
            data-testid={ alt === correctAnswer
              ? 'correct-answer'
              : `wrong-answer${index}` }
            disabled={ selectedAnswer }
            className={ selectedAnswer && alt === correctAnswer
              ? 'correct' : 'incorrect' }
            type="button"
            key={ alt }
            onClick={ this.handleClick }
            value={ difficulty }
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
    } = this.props;
    return (
      <main>
        <p data-testid="question-category">{`${category}`}</p>
        <p data-testid="question-text">{`${question}`}</p>
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
  difficulty: PropTypes.string.isRequired,
};

export default Questions;
