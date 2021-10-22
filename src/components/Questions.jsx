import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions/index';

import './questions.css';
import Timer from './Timer';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      isClick: false,
      time: 30,
      timerId: null,
      disabled: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.clock = this.clock.bind(this);
    this.setClock = this.setClock.bind(this);
  }

  componentDidMount() {
    const { fetchQuestionsAPI } = this.props;
    fetchQuestionsAPI();
  }

  setClock() {
    const SECOND = 1000;
    const timerId = setInterval(() => this.clock(), SECOND);
    this.setState({ timerId });
  }

  clock() {
    const { time, timerId } = this.state;
    if (time > 0) {
      this.setState(
        (previousState) => ({ time: previousState.time - 1 }),
      );
    } else {
      clearInterval(timerId);
      this.setState({ disabled: true });
    }
  }
  //

  handleClick() {
    this.setState({ isClick: true });
  }

  render() {
    const { questions } = this.props;
    const { isClick, time, disabled } = this.state;

    if (questions.length > 0) {
      return (
        <div>
          <h2 data-testid="question-category">
            { questions[0].category }
          </h2>
          <p data-testid="question-text">
            { questions[0].question }
          </p>
          <button
            type="button"
            data-testid="correct-answer"
            className={ isClick ? 'correct-answer' : null }
            onClick={ this.handleClick }
            disabled={ disabled }
          >
            { questions[0].correct_answer }
          </button>
          { questions[0].incorrect_answers.map((question, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className={ isClick ? 'incorrect-answers' : null }
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              { question }
            </button>
          ))}
          <Timer time={ time } setTimer={ this.setClock } />
        </div>
      );
    }

    return (
      <div>
        Carregando...
      </div>
    );
  }
}

Questions.propTypes = {
  fetchQuestionsAPI: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsAPI: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
