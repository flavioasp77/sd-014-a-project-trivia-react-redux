import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Header from './Header';
import { getQuestions } from '../services/triviaAPI';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      index: 0,
      loading: true,
    };
    this.fetchAPI = this.fetchAPI.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const questions = await getQuestions();
    this.setState({
      questions,
      loading: false,
    });
  }

  answerMap() {
    const { questions, index } = this.state;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[index];
    const answers = [...incorrectAnswers, correctAnswer];
    const renderAnswers = answers.map((question, i) => {
      const answerLength = answers.length - 1;
      const test = (i === answerLength) ? 'correct-answer' : `wrong-answer-${i}`;
      return (
        <button
          type="button"
          data-testid={ test }
          key={ i }
        >
          { question }
        </button>
      );
    });
    const ofive = 0.5;
    renderAnswers.sort(() => Math.random() - ofive);
    return renderAnswers;
  }

  renderFunction() {
    const { questions, index } = this.state;
    const { category, question } = questions[index];
    return (
      <>
        <section>
          <h1 data-testid="question-category">
            { category }
          </h1>
          <p data-testid="question-text">
            { question }
          </p>
        </section>
        { this.answerMap().map((button) => button) }
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
        Trivia
        { !loading && this.renderFunction() }
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Trivia)
export default Trivia;
