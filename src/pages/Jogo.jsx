import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { getQuestionsThunk, getScore } from '../actions';
import { readLocalStorage,
  writeLocalStorage, updateLocalStorage } from '../services/util';
import Loading from '../components/Loading';

class Jogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currQuestion: 0,
      clicked: false,
      timer: 30,
      assertions: 0,
      score: 0,
    };
    this.loadQuestions = this.loadQuestions.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.concatAnswers = this.concatAnswers.bind(this);
    this.startCronometer = this.startCronometer.bind(this);
    this.setClass = this.setClass.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  componentDidMount() {
    this.loadQuestions();
    this.startCronometer();
  }

  componentDidUpdate(_prevProps, prevState) {
    const MAX_SECONDS = 0;

    if (prevState.timer === MAX_SECONDS) {
      clearInterval(this.cronometerInterval);
      this.endTimer();
    }
  }

  async setClass(e) {
    clearInterval(this.cronometerInterval);
    this.setState((prevState) => ({
      ...prevState,
      clicked: true,
      timer: prevState.timer,
    }));
    this.checkAnswer(e.target.dataset.testid);
  }

  setScore() {
    const { questions } = this.props;
    const { currQuestion, timer } = this.state;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    const BASE = 10;
    if (questions[currQuestion].difficulty === 'hard') {
      return BASE + (timer * HARD);
    }
    if (questions[currQuestion].difficulty === 'medium') {
      return BASE + (timer * MEDIUM);
    }
    if (questions[currQuestion].difficulty === 'easy') {
      return BASE + (timer * EASY);
    }
  }

  async checkAnswer(answer) {
    const points = this.setScore();
    if (answer === 'correct-answer') {
      await this.setState((prevState) => ({
        ...prevState,
        assertions: prevState.assertions + 1,
        score: prevState.score + points,
      }));
    }
    const { score, assertions } = this.state;
    const { sendScore } = this.props;
    updateLocalStorage('score', score);
    updateLocalStorage('assertions', assertions);
    sendScore(score);
  }

  startCronometer() {
    const ONE_SECOND = 1000; // Milisegundos
    this.cronometerInterval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  }

  endTimer() {
    this.setState({ timer: 'Acabou o tempo!', clicked: true });
  }

  async loadQuestions() {
    const { getQuestions } = this.props;
    await getQuestions();
    this.setState({ isLoading: false });
  }

  changeQuestion() {
    const { currQuestion, score } = this.state;
    const { history, name, email } = this.props;
    const QUESTIONS_LENGTH = 4;
    if (currQuestion === QUESTIONS_LENGTH) {
      let ranking = readLocalStorage('ranking');
      if (ranking === null) {
        ranking = [{
          name,
          score,
          picture: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
        }];
        writeLocalStorage('ranking', ranking);
      } else {
        ranking.push({
          name,
          score,
          picture: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
        });
        writeLocalStorage('ranking', ranking);
      }
      return history.push('/feedback');
    }
    this.setState((prevState) => ({
      currQuestion: prevState.currQuestion + 1,
      clicked: false,
    }
    ));
    this.setState({ timer: 30 }, () => {
      clearInterval(this.cronometerInterval);
      this.startCronometer();
    });
  }

  concatAnswers(correct, incorrect) {
    const answers = [...incorrect, correct];
    return answers.sort();
  }

  button() {
    const { currQuestion } = this.state;
    const QUESTIONS_LENGTH = 4;
    if (currQuestion < QUESTIONS_LENGTH) {
      return (
        <button
          type="button"
          onClick={ this.changeQuestion }
          data-testid="btn-next"
        >
          Próxima
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={ this.changeQuestion }
        data-testid="btn-next"
      >
        Feedback
      </button>
    );
  }

  questions() {
    const { questions } = this.props;
    const { currQuestion, clicked, timer } = this.state;
    const options = this.concatAnswers(questions[currQuestion].correct_answer,
      questions[currQuestion].incorrect_answers);
    return (
      <div>
        <p>
          {!clicked && 'Tempo restante: '}
          {timer}
        </p>
        <h4 data-testid="question-category">{questions[currQuestion].category}</h4>
        <p data-testid="question-text">{questions[currQuestion].question}</p>
        {options.map((question, index) => (
          question === questions[currQuestion].correct_answer ? (
            <button
              className={ clicked ? 'green-border' : '' }
              onClick={ (e) => this.setClass(e) }
              type="button"
              key={ index }
              value={ question }
              data-testid="correct-answer"
              disabled={ clicked }
            >
              {question}
            </button>
          ) : (
            <button
              className={ clicked ? 'red-border' : '' }
              onClick={ (e) => this.setClass(e) }
              type="button"
              key={ index }
              value={ question }
              data-testid={ `wrong-answers-${index}` }
              disabled={ clicked }
            >
              {question}
            </button>
          )
        ))}
        {clicked && this.button()}
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? <Loading /> : this.questions()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionsThunk(token)),
  sendScore: (score) => dispatch(getScore(score)),
});

const mapStateToProps = ({ questions: { questions }, user: { email, name } }) => ({
  questions,
  email,
  name,
});

Jogo.propTypes = {
  email: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
