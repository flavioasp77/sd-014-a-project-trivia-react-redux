import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';
import '../Game.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      timer: 30,
      answered: '',
      answers: [],
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
    // this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  componentDidMount() { this.timer(); }

  componentDidUpdate(prevProps, prevState) {
    const { questions } = this.props;
    const { id } = this.state;
    if (prevProps.questions !== questions || prevState.id !== id) {
      this.setAnswers();
    }
  }

  async setAnswers() {
    const { questions } = this.props;
    const { id } = this.state;
    const points = [questions[id].correct_answer, ...questions[id].incorrect_answers];
    for (let i = points.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const k = points[i];
      points[i] = points[j];
      points[j] = k;
    }
    this.setState({
      answers: points,
      answered: false,
    });
  }

  timer() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  resetTimer() { this.setState({ timer: 30 }); }

  handleAnswer() {
    const TWO_SECONDS = 2000;
    this.setState({ answered: true }, () => {
      setTimeout(() => {
        this.nextQuestion();
      }, TWO_SECONDS);
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }), () => this.resetTimer());
  }

  render() {
    const { questions, loading } = this.props;
    const { id, timer, answers, answered } = this.state;
    const ZERO = 0;
    if (loading) return <Loading />;
    return (
      <div>
        <span data-testid="timer">{(timer > ZERO) ? timer : 'Time is up!'}</span>
        <h1>
          <span data-testid="question-category">{questions[id].category}</span>
        </h1>
        <h2>
          <span data-testid="question-text">{questions[id].question}</span>
        </h2>
        { answers.map((answer, index, array) => (
          <button
            key={ index }
            data-testid={ questions[id].correct_answer === answer
              ? 'correct-answer'
              : `wrong-answer-${array.indexOf(answer)}` }
            type="button"
            onClick={ () => this.handleAnswer() }
            disabled={ (timer <= ZERO) }
            className={
              answered
              && (answer === questions[id].correct_answer ? 'greenBorder' : 'redBorder')
            }
          >
            { answer }
          </button>
        ))}
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  loading: state.questions.loading,
});

export default connect(mapStateToProps)(Questions);
