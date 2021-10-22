import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Header from './Header';
import { getQuestions } from '../services/triviaAPI';
import '../styles/trivia.css';
import Timer from '../components/Timer';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      index: 0,
      loading: true,
      isClicked: false,
      answerArray: [],
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.randomArray = this.randomArray.bind(this);
    this.createBtn = this.createBtn.bind(this);
    this.updateBtn = this.updateBtn.bind(this);
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

  handleClick() {
    this.setState({
      isClicked: true,
    });
  }

  answerMap() {
    const { answerArray, isClicked } = this.state;
    const verify = answerArray.length === 0;
    if (verify) {
      return this.createBtn();
    }
    if (!verify && isClicked) {
      return this.updateBtn();
    }
    return answerArray;
  }

  createBtn() {
    const { questions, index } = this.state;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[index];
    const answers = [...incorrectAnswers, correctAnswer];
    const renderAnswers = answers.map((answer, i) => {
      const answerLength = answers.length - 1;
      const test = (i === answerLength) ? 'correct-answer' : `wrong-answer-${i}`;
      return (
        <button
          id={ test }
          type="button"
          data-testid={ test }
          key={ i }
          onClick={ this.handleClick }
        >
          { answer }
        </button>
      );
    });
    return this.randomArray(renderAnswers);
  }

  updateBtn() {
    const { answerArray } = this.state;
    const newAnswerArray = answerArray.map(({ props, key }) => {
      const verifyBtn = props.id.includes('correct');
      const btnClass = verifyBtn ? 'correct-answer' : `wrong-answer-${key}`;
      return (
        <button
          id={ btnClass }
          type="button"
          data-testid={ btnClass }
          key={ key }
          onClick={ this.handleClick }
          className={ btnClass }
          disabled
        >
          { props.children }
        </button>
      );
    });
    this.setState({
      answerArray: newAnswerArray,
      isClicked: false,
    });
    return newAnswerArray;
  }

  randomArray(array) {
    const ofive = 0.5;
    const newArrayAnswers = array.sort(() => Math.random() - ofive);
    this.setState({
      answerArray: newArrayAnswers,
    });
    return newArrayAnswers;
  }

  renderFunction() {
    const { questions, index, isClicked, isDisable } = this.state;
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
        <Timer
          isClicked={ isClicked }
          updateBtn={ this.updateBtn }
          isDisable={ isDisable }
        />
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
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
