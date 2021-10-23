import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import shuffleArray from '../services/shuffleArray';
import { fetchQuestionsAction } from '../redux/actions';
import '../styles/questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      question: '',
      answers: [],
      correct: '',
      seconds: 30,
      timer: true,
      highlight: false,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  onSelectAnswer() {
    clearInterval(this.timer);
    this.setState({
      timer: false,
      highlight: true,
    });
  }

  async fetchQuestions() {
    const { fetchQuestionsToState } = this.props;
    const questions = await fetchQuestionsToState();

    const {
      category,
      question,
      correct_answer: correct,
      incorrect_answers: incorrect,
    } = questions[0];

    this.setState({
      category,
      question,
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
          });
          clearInterval(this.timer);
        }
      });
    }, ONE_SECOND);
  }

  render() {
    const { category, question, answers, correct } = this.state;
    const { highlight, seconds, timer } = this.state;
    const { loadingState } = this.props;

    if (loadingState) {
      return (
        <span>Loading...</span>
      );
    }

    return (
      <section>
        <span data-testid="question-category">
          { category }
        </span>
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
      </section>
    );
  }
}

Questions.propTypes = {
  fetchQuestionsToState: PropTypes.func.isRequired,
  loadingState: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  stateQuestions: state.player.questions,
  loadingState: state.player.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsToState: () => dispatch(fetchQuestionsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
