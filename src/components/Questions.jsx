import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    const { pergunta } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrecttAnswers } = pergunta;

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
    const { pergunta } = this.props;
    const {
      question,
      cathegory,
      correct_answer: correctAnswer,
    } = pergunta;
    const { answerAlts, selectedAnswer } = this.state;
    console.log(pergunta);
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
  pergunta: PropTypes.shape({
    cathegory: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};
export default Questions;
