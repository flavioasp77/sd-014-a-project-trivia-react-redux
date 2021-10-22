import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionApiThunk } from '../redux/actions';
import Btn from './Btn';
import './questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      order: 0,
      atualQuestion: 0,
      second: 30,
      savedSecond: 0,
      person: {
        finalScore: 0,
      },
    };

    this.handleNextBtn = this.handleNextBtn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.finishQuest = this.finishQuest.bind(this);
  }

  componentDidMount() {
    const { token, getQuestion } = this.props;
    getQuestion(token);
    this.shufflebuttons();
    this.timerCount();
  }

  shufflebuttons() {
    const ANSWER_NUMBER = 4;
    const randomBtn = Math.floor(Math.random() * ANSWER_NUMBER).toString();
    this.setState({
      order: randomBtn,
    });
  }

  finishQuest() {
    this.setState({
      isClicked: true,
    });
  }

  handleClick({ target }) {
    const { person } = this.state;
    const { updateValue } = this.props;
    const { id, name } = target;
    if (id === 'correct') {
      const yesPoint = this.corretAwnser(name);

      updateValue(Number(yesPoint));
      this.setState((prev) => ({
        person: { finalScore: prev.person.finalScore + yesPoint },
      }));
      localStorage.setItem('Player', JSON.stringify(person));
    }
    const { second } = this.state;
    this.setState({
      isClicked: true,
      savedSecond: second,
    });
  }

  corretAwnser(isItHard) {
    const THREE = 13;
    const TWO = 12;
    const ONE = 11;
    switch (isItHard) {
    case 'hard':
      return THREE;
    case 'medium':
      return TWO;
    case 'easy':
      return ONE;
    default:
      return 0;
    }
  }

  handleNextBtn() {
    const { atualQuestion } = this.state;
    const nextQuestion = atualQuestion + 1;
    this.setState({
      atualQuestion: nextQuestion,
      isClicked: false,
      second: 30,
      savedSecond: 0,
    });
    this.timerCount();
  }

  timerCount() {
    const SECOND = 1000;
    const action = setInterval(() => {
      const { second, savedSecond } = this.state;
      if (second === 0 || savedSecond !== 0) {
        this.finishQuest();
        return clearInterval(action);
      }
      this.setState((prevState) => ({ second: prevState.second - 1 }));
    }, SECOND);
  }

  render() {
    const CODE = 3;
    const { questions } = this.props;
    const { results, response_code: responseCode } = questions;
    const { isClicked, order, atualQuestion, second, savedSecond } = this.state;

    if (results === undefined) return <p>Carregando...</p>;
    if (responseCode === CODE) {
      return <p>O tempo expirou! Inicie o jogo novamente</p>;
    }

    return (
      <main>
        <h2 data-testid="question-category">
          { results[atualQuestion].category }
        </h2>
        <p data-testid="question-text">
          { results[atualQuestion].question }
        </p>
        <br />
        <div>{ isClicked ? `${savedSecond} seg` : `${second} seg` }</div>
        <Btn
          handleNextBtn={ this.handleNextBtn }
          handleClick={ this.handleClick }
          isClicked={ isClicked }
          order={ order }
          atualQuestion={ atualQuestion }
          results={ results }
        />
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.success,
  questions: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (token) => dispatch(questionApiThunk(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
