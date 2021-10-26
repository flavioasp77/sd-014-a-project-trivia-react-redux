import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import generateRandomAnswers,
{ attPlayerfromLS } from '../helpers/index';
import Question from '../components/Question';
import { handleUserAnswer as handleUserAnswerAction,
  nextQuestion as nextQuestionAction,
  setAnswers as setAnswersAction } from '../actions/gameActions';
import { updateTimer as updateTimerAction } from '../actions/questionTimerActions';

class Jogo extends Component {
  constructor() {
    super();
    this.handleResponse = this.handleResponse.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    const { game: { questions, index }, setAnswers, history } = this.props;
    if (questions.length === 0) return history.push('/');
    setAnswers(generateRandomAnswers(questions, index));
  }

  handleResponse({ target: { value } }) {
    const { handleUserAnswer, game: { answers },
      questionTimer, updateTimer } = this.props;
    updateTimer({ timerValue: questionTimer.timerValue, timerIsOn: false });
    attPlayerfromLS(answers[value], questionTimer.timerValue);
    handleUserAnswer();
  }

  handleNextQuestion() {
    const { game: { questions, index },
      setAnswers, history, nextQuestion, updateTimer } = this.props;
    nextQuestion();
    updateTimer({ timerValue: 30, timerIsOn: true });
    return index + 1 !== questions.length
      ? setAnswers(generateRandomAnswers(questions, (index + 1)))
      : history.push('/feedback');
  }

  render() {
    const { game: { infoIsLoaded } } = this.props;
    return (
      <>
        <Header />
        <main>
          {infoIsLoaded
        && <Question
          handleNextQuestion={ this.handleNextQuestion }
          handleResponse={ this.handleResponse }
        />}
        </main>
      </>
    );
  }
}

Jogo.propTypes = {
  game: PropTypes.objectOf(PropTypes.any).isRequired,
  setAnswers: PropTypes.func.isRequired,
  handleUserAnswer: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
  questionTimer: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ game, questionTimer }) => ({
  game,
  questionTimer,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswers: (payload) => dispatch(setAnswersAction(payload)),
  handleUserAnswer: () => dispatch(handleUserAnswerAction()),
  nextQuestion: () => dispatch(nextQuestionAction()),
  updateTimer: (payload) => dispatch(updateTimerAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
