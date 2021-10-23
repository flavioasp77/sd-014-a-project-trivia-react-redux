import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { questionApiThunk } from '../actions';
import Button from './Button';

import './questions.css';

const ANSWER = 4;

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      css: false,
      order: 0,
      seconds: 30,
      savedSeconds: 0,
      questionAtual: 0,
      score: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.finishedQuestion = this.finishedQuestion.bind(this);
  }

  componentDidMount() {
    const { token, getQuestion, name, gravatarEmail } = this.props;
    getQuestion(token);
    this.timerCount();
    const user = { user: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    } };
    localStorage.setItem('state', JSON.stringify(user));
  }

  randomButtons() {
    const randomBtn = Math.floor(Math.random() * ANSWER).toString();
    this.setState({
      order: randomBtn,
    });
  }

  finishedQuestion() {
    this.setState({
      css: true,
    });
  }

  handleClick({ target }) {
    const CORRECT = 10;
    const { id, name } = target;
    const { updatePoints } = this.props;
    const { seconds } = this.state;
    this.setState({
      css: true,
      savedSeconds: seconds,
    });

    if (id === 'correct') {
      const makePoints = CORRECT + (this.correctAwnser(name) * seconds);
      updatePoints(makePoints);
      this.setState((previus) => ({
        score: previus.score + makePoints,
      }));
    }
  }

  correctAwnser(dificult) {
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    switch (dificult) {
    case 'easy':
      return ONE;
    case 'medium':
      return TWO;
    case 'hard':
      return THREE;
    default:
      return 0;
    }
  }

  handleNextButton() {
    const { questionAtual } = this.state;

    if (questionAtual === ANSWER) {
      const { history } = this.props;
      history.push('/feedback');
    }

    this.setState({
      questionAtual: questionAtual + 1,
      css: false,
      seconds: 30,
      savedSeconds: 0,
    });
    this.timerCount();
    this.randomButtons();
  }

  timerCount() {
    const SECOND = 1000;
    const actionSecond = setInterval(() => {
      const { seconds, savedSeconds } = this.state;
      if (seconds === 0 || savedSeconds !== 0) {
        this.handleClick();
        return clearInterval(actionSecond);
      }
      this.setState((previusState) => ({ seconds: previusState.seconds - 1 }));
    }, SECOND);
    return actionSecond;
  }

  render() {
    const CODE = 3;
    const { questions } = this.props;
    const { results, response_code: responseCode } = questions;
    const { css, seconds, order, questionAtual } = this.state;
    if (results === undefined) return <p>Loading...</p>;
    if (responseCode === CODE) {
      return <p>Section expired</p>;
    }

    return (
      <main>
        <h2 data-testid="question-category">
          { results[questionAtual].category }
        </h2>
        <p data-testid="question-text">
          { results[questionAtual].question }
        </p>
        <div>
          { `${seconds} segundos` }
        </div>
        <Button
          handleNextButton={ this.handleNextButton }
          handleClick={ this.handleClick }
          order={ order }
          questionAtual={ questionAtual }
          results={ results }
          css={ css }
        />
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  updatePoints: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.success,
  questions: state.game.questions,
  name: state.user.name,
  gravatarEmail: state.user.email,

});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (token) => dispatch(questionApiThunk(token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));
