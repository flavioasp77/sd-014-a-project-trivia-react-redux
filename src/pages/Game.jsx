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

  mixBoolean(correctAnswer, incorretAnswers) {
    return (
      <>
        <button
          type="button"
          data-testid="wrong-answer-0"
        >
          { incorretAnswers[0] }
        </button>
        <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
      </>
    );
  }

  verifyRange(RANGE, incorrectMaped, rightAnswer) {
    const RANGE05 = 0.5;
    const RANGE075 = 0.75;
    const arrangement = [];

    if (RANGE === RANGE05) {
      arrangement.push(incorrectMaped[0]);
      arrangement.push(rightAnswer);
      arrangement.push(incorrectMaped[1]);
      arrangement.push(incorrectMaped[2]);
      return arrangement;
    }
    if (RANGE === RANGE075) {
      arrangement.push(incorrectMaped[0]);
      arrangement.push(incorrectMaped[1]);
      arrangement.push(rightAnswer);
      arrangement.push(incorrectMaped[2]);
      return arrangement;
    }
  }

  mixMultiple(correctAnswer, incorretAnswers, randomic) {
    const RANGE05 = 0.5;
    const RANGE075 = 0.75;

    const rightAnswer = (
      <>
        <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
        <br />
      </>
    );

    const incorrectMaped = incorretAnswers.map((incorrect, i) => (
      <section key={ i }>
        <button
          type="button"
          data-testid={ `wrong-answer-${i}` }
          key={ i }
        >
          {incorrect}
        </button>
        <br />
      </section>
    ));
    if (randomic <= RANGE05) {
      const arrangement = this.verifyRange(RANGE05, incorrectMaped, rightAnswer);
      return arrangement;
    }
    if (randomic <= RANGE075) {
      const arrangement = this.verifyRange(RANGE075, incorrectMaped, rightAnswer);
      return arrangement;
    }
    const arrangement = [...incorrectMaped, rightAnswer];
    return arrangement;
  }

  renderQuestions(objectQuestion) {
    const { type, correct_answer: correctAnswer } = objectQuestion;
    const { incorrect_answers: incorretAnswers } = objectQuestion;
    const randomic = Math.random();
    //  console.log(randomic);
    if (type === 'boolean') {
      const RANGE = 0.5;
      if (randomic > RANGE) {
        return this.mixBoolean(correctAnswer, incorretAnswers);
      }
      return (
        <>
          <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
          <button
            type="button"
            data-testid="wrong-answer-0"
          >
            { incorretAnswers[0] }
          </button>
        </>
      );
    }
    const RANGE025 = 0.25;
    if (randomic > RANGE025) {
      return this.mixMultiple(correctAnswer, incorretAnswers, randomic);
    }
    //  console.log("Primeiro");
    return (
      <>
        <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
        { incorretAnswers.map((incorrect, i) => (
          <section key={ i }>
            <br />
            <button
              type="button"
              data-testid={ `wrong-answer-${i}` }
              key={ i }
            >
              {incorrect}
            </button>
          </section>
        )) }
      </>
    );
  }

  render() {
    const { arrayQuestions } = this.props;
    const { index } = this.state;
    //  console.log(arrayQuestions);
    if (arrayQuestions.length === 0) return <h1>... Loading</h1>;
    const objectQuestion = arrayQuestions[index];
    const { category, question } = objectQuestion;
    //  console.log(arrayQuestions);
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
