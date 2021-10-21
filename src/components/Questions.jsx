import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionApiThunk } from '../redux/actions';
import NextBtn from './NextBtn';
import Conter from './Conter';
import './questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      order: '',
      atualQuestion: 0,
      condicion: false,
    };

    this.handleNextBtn = this.handleNextBtn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isTimerIsZero = this.isTimerIsZero.bind(this);
  }

  componentDidMount() {
    const { token, getQuestion } = this.props;
    getQuestion(token);
    this.shufflebuttons();
  }

  shufflebuttons() {
    const ANSWER_NUMBER = 4;
    const randomBtn = Math.floor(Math.random() * ANSWER_NUMBER).toString();
    this.setState({
      order: randomBtn,
    });
  }

  handleClick() {
    this.setState({
      isClicked: true,
    });
  }

  handleNextBtn() {
    const { atualQuestion } = this.state;
    const nextQuestion = atualQuestion + 1;
    this.setState({
      atualQuestion: nextQuestion,
      isClicked: false,
    });
  }

  isTimerIsZero() {
    this.setState({ condicion: true });
  }

  render() {
    const CODE = 3;
    const { questions } = this.props;
    const { results, response_code: responseCode } = questions;
    const { isClicked, order, condicion, atualQuestion } = this.state;

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
        <div className="div-answers">
          <button
            type="button"
            data-testid="correct-answer"
            className={ isClicked ? 'correct' : null }
            style={ { order } }
            onClick={ this.handleClick }
            disabled={ condicion }
          >
            { results[atualQuestion].correct_answer }
          </button>
          { results[atualQuestion].incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className={ isClicked ? 'incorrect' : null }
              style={ { order: index } }
              onClick={ this.handleClick }
              disabled={ condicion }
            >
              { answer }
            </button>
          ))}
        </div>
        <br />
        <Conter solution={ this.handleClick } isTimerZero={ this.isTimerIsZero } />
        { isClicked && <NextBtn handleClick={ this.handleNextBtn } />}
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number,
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
