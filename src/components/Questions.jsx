import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrecttAnswers } = this.props;

    this.state = {
      answerAlts: [correctAnswer, ...incorrecttAnswers]
        .map((alt) => ({ alt, position: Math.random() }))
        .sort((a, b) => a.position - b.position).map(({ alt }) => alt),
      selectedAnswer: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      selectedAnswer: true,
    });
  }

  render() {
    const {
      question,
      cathegory,
      correct_answer: correctAnswer,
    } = this.props;
    const { answerAlts, selectedAnswer } = this.state;
    return (
      <main>
        <p data-testid="question-category">{ cathegory }</p>
        <p data-testid="question-text">{ `${question}` }</p>
        <section>
          {
            answerAlts.map((alt, index) => (
              <button
                data-testid={
                  selectedAnswer === correctAnswer
                    ? 'correctAnswer' : `wrong-answer-${index}`
                }
                disabled={ selectedAnswer }
                className={ selectedAnswer && alt === correctAnswer
                  ? 'correct' : 'incorrect' }
                type="button"
                key={ alt }
                onClick={ this.handleClick }
              >
                { alt }
              </button>
            ))
          }
        </section>
      </main>
    );
  }
}

Questions.propTypes = {
  cathegory: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  question: PropTypes.string,
};

Questions.defaultProps = {
  cathegory: '',
  correct_answer: '',
  incorrect_answers: [],
  question: '',
};

export default Questions;
