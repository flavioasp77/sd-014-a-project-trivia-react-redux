import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     showAnswer: false,
  //     score: 0,
  //     qstnLevel: '',
  //     seconds: 30,
  //   };
  //   this.setScore = this.setScore.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  //   this.updateState = this.updateState.bind(this);
  // }

  // componentDidMount() {
  //   const ONE_SECOND = 1000;
  //   this.counter = setInterval(() => {
  //     this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
  //   }, ONE_SECOND);
  // }

  // componentDidUpdate() {
  //   const { seconds } = this.state;
  //   if (seconds === 0) {
  //     clearInterval(this.counter);
  //   }
  // }

  // setScore(difficulty) {
  //   if (difficulty === 'easy') {
  //     this.updateState({ qstnLevel: 1 });
  //   } if (difficulty === 'medium') {
  //     this.updateState({ qstnLevel: 2 });
  //   } if (difficulty === 'hard') {
  //     this.updateState({ qstnLevel: 3 });
  //   }

  //   const { score, qstnLevel } = this.state;
  //   const basePoints = { easy: 1, medium: 2, hard: 3, base: 10 };

  //   const anwserPoints = basePoints.base + (qstnLevel);
  //   this.updateState({
  //     score: score + anwserPoints,
  //   });
  //   console.log(anwserPoints);
  // }

  // updateState(state) {
  //   this.setState(state);
  // }

  // handleClick(difficulty) {
  //   this.setState({ showAnswer: true });
  //   this.setScore(difficulty);
  // }

  // render() {
  //   const { data } = this.props;
  //   const { showAnswer, seconds } = this.state;
  render() {
    const { data, nextQuestion, shouldShowAnswer, showAnswer } = this.props;

    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      question,
      // difficulty,
    } = data;

    return (
      <>
        <div className="question-card">
          <div className="question-container">
            <p className="question-category" data-testid="question-category">
              {category}
            </p>
            <p className="question-text" data-testid="question-text">
              {question}
            </p>
          </div>
          <Answers
            correctAnswer={ correct }
            incorrectAnswers={ incorrect }
            onAnswerClick={ showAnswer }
            showAnswer={ shouldShowAnswer }
          />
          {/* <p className="timer">{`Tempo: ${seconds}`}</p> */}
          {/* Correct answer button attributes
        className={ seconds === 0 || shouldShowAnswer ? 'answer correct' : 'answer' }
        data-testid="correct-answer"
        onClick={ () => this.handleClick(difficulty) } */}
        </div>
        {shouldShowAnswer && (
          <button
            className="btn-next"
            data-testid="btn-next"
            onClick={ nextQuestion }
            type="button"
            // disabled={ seconds === 0 }
          >
            PRÓXIMA
          </button>
        )}
      </>
    );
  }
}
// {incorrect.map((answer, index) => (
//   <button
//     className={ seconds === 0 || shouldShowAnswer ? 'answer wrong' : 'answer' }
//     data-testid={ `wrong-answer-${index}` }
//     key={ `${answer}-${index}` }
//     onClick={ this.handleClick }
//     type="button"
//     disabled={ seconds === 0 }
//   >
//     {answer}
//   </button>
// ))}

QuestionCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  shouldShowAnswer: PropTypes.bool.isRequired,
  showAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
