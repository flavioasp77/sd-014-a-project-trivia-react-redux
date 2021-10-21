import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  mixBoolean(correctAnswer, incorretAnswer) {
    return (
      <>
        <button
          type="button"
          data-testid="wrong-answer-0"
        >
          { incorretAnswer[0] }
        </button>
        <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
      </>
    );
  }

  renderQuestions(objectQuestion) {
    const { type, correct_answer: correctAnswer } = objectQuestion;
    const { incorrect_answers: incorretAnswer } = objectQuestion;
    const randomic = Math.random();
    const RANGE = 0.5;
    //  console.log(randomic);
    if (type === 'boolean') {
      if (randomic > RANGE) {
        return this.mixBoolean(correctAnswer, incorretAnswer);
      }
      return (
        <>
          <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
          <button
            type="button"
            data-testid="wrong-answer-0"
          >
            { incorretAnswer[0] }
          </button>
        </>
      );
    }
    return (
      <>
        <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
        { incorretAnswer.map((incorrect, i) => (
          <>
            <br />
            <button
              type="button"
              data-testid={ `wrong-answer-${i}` }
              key={ i }
            >
              {incorrect}
            </button>
          </>
        )) }
      </>
    );
  }

  render() {
    const { arrayQuestions } = this.props;
    const { index } = this.state;
    console.log(arrayQuestions);
    if (arrayQuestions.length === 0) return <h1>... Loading</h1>;
    const objectQuestion = arrayQuestions[index];
    const { category, question } = objectQuestion;
    console.log(arrayQuestions);
    return (
      <section>
        <section data-testid="question-category">{ category }</section>
        <br />
        <section data-testid="question-text">{ question }</section>
        <br />
        { this.renderQuestions(objectQuestion) }
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    arrayQuestions: state.questionsReducer.questions,
  };
}

Game.propTypes = {
  arrayQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Game);
