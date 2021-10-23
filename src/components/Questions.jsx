import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { questionApiThunk, scoreAction } from '../redux/actions';
import Btn from './Btn';
import './questions.css';

const ANSWER_NUMBER = 4;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      order: '',
      atualQuestion: 0,
      second: 30,
      savedSecond: 0,
      score: 0,
    };

    this.handleNextBtn = this.handleNextBtn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.finishQuest = this.finishQuest.bind(this);
  }

  componentDidMount() {
    const { token, getQuestion, name, gravatarEmail } = this.props;
    getQuestion(token);
    this.shufflebuttons();
    this.timerCount();
    const player = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    } };

    localStorage.setItem('state', JSON.stringify(player));
  }

  shufflebuttons() {
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

  corretAwnser(isItHard) {
    const THREE = 3;
    const TWO = 2;
    const ONE = 1;
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
    return action;
  }

  handleClick({ target }) {
    const CORRECT = 10;
    const { id, name } = target;
    const { second } = this.state;
    this.setState({
      isClicked: true,
      savedSecond: second,
    });

    if (id === 'correct') {
      const { attScoreGlobal, updateValue } = this.props;
      const yesPoint = CORRECT + (this.corretAwnser(name) * second);
      updateValue(yesPoint);

      this.setState((prev) => ({
        score: prev.score + yesPoint,
      }), () => {
        const { score } = this.state;
        attScoreGlobal(score);
      });
    }
  }

  handleNextBtn() {
    const { atualQuestion } = this.state;

    if (atualQuestion === ANSWER_NUMBER) {
      const { history } = this.props;
      history.push('/feedback');
    }

    this.setState({
      atualQuestion: atualQuestion + 1,
      isClicked: false,
      second: 30,
      savedSecond: 0,
    });
    this.timerCount();
    this.shufflebuttons();
  }

  render() {
    const CODE = 3;
    const { isClicked, order, atualQuestion, second } = this.state;
    const { questions, history } = this.props;
    const { results, response_code: responseCode } = questions;

    if (results === undefined) return <p>Carregando...</p>;

    if (responseCode === CODE) {
      return (
        <>
          <p>O tempo expirou! Inicie o jogo novamente</p>
          <button type="button" onClick={ () => history.push('/') }>
            Voltar para o inicio
          </button>
        </>
      );
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
        <div>{ `${second} seg` }</div>
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
  attScoreGlobal: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  token: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.success,
  questions: state.trivia.questions,
  name: state.player.name,
  gravatarEmail: state.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (token) => dispatch(questionApiThunk(token)),
  attScoreGlobal: (score) => dispatch(scoreAction(score)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));
