import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import shuffleArray from '../services/shuffleArray';
import scoreCalculator from '../services/scoreCalculator';
import {
  fetchQuestionsAction,
  nextQuestionAction,
  apiRequestAction } from '../redux/actions';
import '../styles/questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      question: '',
      answers: [],
      correct: '',
      difficulty: '',
      seconds: 30,
      timer: true,
      highlight: false,
      nextToogle: false,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  onSelectAnswer(event) {
    const { correct, seconds, difficulty } = this.state;
    const { innerHTML } = event.target;

    const score = scoreCalculator(innerHTML, correct, seconds, difficulty);

    const currentLocalStorage = JSON.parse(localStorage.getItem('state'));

    if (score) {
      currentLocalStorage.player.assertions += 1;
      currentLocalStorage.player.score += score;
    }

    localStorage.setItem('state', JSON.stringify(currentLocalStorage));

    clearInterval(this.timer);
    this.setState({
      timer: false,
      highlight: true,
      nextToogle: true,
    });
  }

  nextQuestion() {
    const {
      stateQuestions,
      currentQuestion,
      loadingToogle,
      nextQuestionToState,
    } = this.props;
    const next = stateQuestions[currentQuestion + 1];
    const maxArray = 4;

    if (currentQuestion === maxArray) {
      console.log('FIM');
    } else {
      loadingToogle();

      this.setState({
        category: next.category,
        question: next.question,
        difficulty: next.difficulty,
        answers: shuffleArray([next.correct_answer, ...next.incorrect_answers]),
        correct: next.correct_answer,
        seconds: 30,
        timer: true,
        highlight: false,

      });

      this.handleTimer();
      nextQuestionToState();
    }
  }

  async fetchQuestions() {
    const { fetchQuestionsToState, currentQuestion } = this.props;
    const questions = await fetchQuestionsToState();

    const {
      category,
      question,
      difficulty,
      correct_answer: correct,
      incorrect_answers: incorrect,
    } = questions[currentQuestion];

    this.setState({
      category,
      question,
      difficulty,
      answers: shuffleArray([correct, ...incorrect]),
      correct,
    });

    this.handleTimer();
  }

  handleTimer() {
    const ONE_SECOND = 1000;

    this.timer = setInterval(() => {
      const { seconds } = this.state;
      const TIME_OVER = 1;

      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }), () => {
        if (seconds === TIME_OVER) {
          this.setState({
            timer: false,
            highlight: true,
            nextToogle: true,
          });
          clearInterval(this.timer);
        }
      });
    }, ONE_SECOND);
  }

  render() {
    const { category, question, answers, correct } = this.state;
    const { highlight, seconds, timer, nextToogle } = this.state;
    const { loadingState } = this.props;
    return loadingState ? <span>Loading...</span> : (
      <section>
        <span data-testid="question-category">{ category }</span>
        <p data-testid="question-text">{ question }</p>
        {
          answers.map((answer, i) => {
            if (answer === correct) {
              return (
                <button
                  className={ highlight ? 'correct-answer' : 'default-answer' }
                  type="button"
                  disabled={ !timer }
                  key={ i }
                  onClick={ this.onSelectAnswer }
                  data-testid="correct-answer"
                >
                  { answer }
                </button>);
            }
            return (
              <button
                className={ highlight ? 'wrong-answer' : 'default-answer' }
                type="button"
                disabled={ !timer }
                key={ i }
                onClick={ this.onSelectAnswer }
                data-testid={ `wrong-answer-${i}` }
              >
                { answer }
              </button>
            );
          })
        }
        <span>{ seconds }</span>
        { nextToogle
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>)}
      </section>
    );
  }
}

Questions.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  fetchQuestionsToState: PropTypes.func.isRequired,
  loadingState: PropTypes.bool.isRequired,
  loadingToogle: PropTypes.func.isRequired,
  nextQuestionToState: PropTypes.func.isRequired,
  stateQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  stateQuestions: state.player.questions,
  currentQuestion: state.player.currentQuestion,
  loadingState: state.player.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsToState: () => dispatch(fetchQuestionsAction()),
  nextQuestionToState: () => dispatch(nextQuestionAction()),
  loadingToogle: () => dispatch(apiRequestAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
