import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../style/Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      colorRight: '',
      colorWrong: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      colorRight: 'answer-correct',
      colorWrong: 'answer-incorrect',
    });
  }

  mixBoolean(correctAnswer, incorretAnswers) {
    const { colorRight, colorWrong } = this.state;
    return (
      <>
        <button
          type="button"
          data-testid="wrong-answer-0"
          onClick={ this.handleClick }
          className={ colorWrong }
        >
          { incorretAnswers[0] }
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
          className={ colorRight }
        >
          { correctAnswer }
        </button>
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
    const { colorRight, colorWrong } = this.state;
    const RANGE05 = 0.5;
    const RANGE075 = 0.75;

    const rightAnswer = (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
          className={ colorRight }
        >
          { correctAnswer }
        </button>
        <br />
      </>
    );

    const incorrectMaped = incorretAnswers.map((incorrect, i) => (
      <section key={ i }>
        <button
          type="button"
          data-testid={ `wrong-answer-${i}` }
          key={ i }
          onClick={ this.handleClick }
          className={ colorWrong }
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

  renderBooleanNotMixed(correctAnswer, incorretAnswers) {
    const { colorRight, colorWrong } = this.state;
    return (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
          className={ colorRight }
        >
          { correctAnswer }
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          onClick={ this.handleClick }
          className={ colorWrong }
        >
          { incorretAnswers[0] }
        </button>
      </>
    );
  }

  renderQuestions(objectQuestion) {
    const { colorRight, colorWrong } = this.state;
    const { type, correct_answer: correctAnswer } = objectQuestion;
    const { incorrect_answers: incorretAnswers } = objectQuestion;
    const randomic = Math.random();
    if (type === 'boolean') {
      const RANGE = 0.5;
      if (randomic > RANGE) {
        return this.mixBoolean(correctAnswer, incorretAnswers);
      }
      this.renderBooleanNotMixed(correctAnswer, incorretAnswers);
    }
    const RANGE025 = 0.25;
    if (randomic > RANGE025) {
      return this.mixMultiple(correctAnswer, incorretAnswers, randomic);
    }
    //  console.log("Primeiro");
    return (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
          className={ colorRight }
        >
          { correctAnswer }
        </button>
        { incorretAnswers.map((incorrect, i) => (
          <section key={ i }>
            <br />
            <button
              type="button"
              data-testid={ `wrong-answer-${i}` }
              key={ i }
              onClick={ this.handleClick }
              className={ colorWrong }
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
      <>
        <Header />
        <section>
          <section data-testid="question-category">{ category }</section>
          <br />
          <section data-testid="question-text">{ question }</section>
          <br />
          { this.renderQuestions(objectQuestion) }
        </section>
      </>
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
