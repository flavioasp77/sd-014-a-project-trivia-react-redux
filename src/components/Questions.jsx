import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveScore } from '../redux/actions';

const MILISECONDS = 1000;
const NUMBER_10 = 10;
const NUMBER_3 = 3;
const TOTAL_QUESTIONS = 4;

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      allQst: [],
      shuffledQuests: [],
      answered: false,
      id: 0,
      seconds: 30,
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
    this.renderCountDown = this.renderCountDown.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.questionAnsweredClassName = this.questionAnsweredClassName.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.renderParagraphs = this.renderParagraphs.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    const { seconds } = this.state;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, MILISECONDS);
    }
  }

  async getQuestions() {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await fetchQuestions.json();
    const { results } = json;
    console.log(results);
    const quests = results.reduce((acc, ele, i) => {
      const allAnswers = [...ele.incorrect_answers, ele.correct_answer];
      this.shuffleQuestions(allAnswers);
      acc[i] = allAnswers;
      return acc;
    }, {});
    this.shuffleQuestions(quests);
    this.setState({ allQst: results, shuffledQuests: quests });
  }

  countDown() {
    const { answered, seconds } = this.state;
    if (!answered) {
      if (seconds === 0) {
        clearInterval(this.timer);
        this.setState({ answered: true });
      } else {
        this.setState({ seconds: seconds - 1 });
      }
    }
  }

  handleState() {
    this.setState({ answered: true });
  }

  shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
  }

  questionAnsweredClassName(className) {
    const { answered } = this.state;
    return answered ? className : 'secret';
  }

  nextQuestion() {
    const { id, seconds } = this.state;
    if (id === TOTAL_QUESTIONS) {
      window.open('/feedback', '_self');
    }
    if (id !== TOTAL_QUESTIONS) {
      this.setState({
        id: id + 1,
        answered: false,
        seconds: 30,
      });
      this.countDown();
      if (seconds === 0) {
        this.timer = setInterval(this.countDown, MILISECONDS);
      }
    }
  }

  handleScore({ target }) {
    this.handleState();
    const { allQst, id, seconds } = this.state;
    const { saveScoreInfo } = this.props;
    const state = JSON.parse(localStorage.getItem('state'));
    if (target.id === 'correct') {
      switch (allQst[id].difficulty) {
      case 'easy':
        saveScoreInfo(state.player.score + NUMBER_10 + (seconds));
        state.player.score += NUMBER_10 + (seconds);
        break;
      case 'medium':
        saveScoreInfo(state.player.score + NUMBER_10 + (seconds * 2));
        state.player.score += NUMBER_10 + (seconds * 2);
        break;
      case 'hard':
        saveScoreInfo(state.player.score + NUMBER_10 + (seconds * NUMBER_3));
        state.player.score += NUMBER_10 + (seconds * NUMBER_3);
        break;
      default: return;
      }
      localStorage.setItem('state', JSON.stringify(state));
    }
  }

  renderCountDown() {
    const { seconds } = this.state;
    return (
      <p className="my-4 trivia-countdown">
        Hurry up! You have
        { ' ' }
        { seconds }
        { ' ' }
        seconds left!
      </p>
    );
  }

  renderNextButton() {
    return (
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="next-btn"
          onClick={ this.nextQuestion }
          data-testid="btn-next"
        >
          Pŕoxima Questão
        </button>
      </div>
    );
  }

  renderParagraphs(category, question) {
    return (
      <>
        <p className="question-cat">
          Category:
          { ' ' }
          <span data-testid="question-category">{ category }</span>
        </p>
        <p className="question-qst">
          Question:
          { ' ' }
          <span data-testid="question-text">{ question }</span>
        </p>
      </>
    );
  }

  render() {
    const { allQst, id, answered, shuffledQuests } = this.state;
    if (allQst.length === 0) return <p>Loading...</p>;
    return (
      <div className="trivia-main">
        <div>
          { this.renderParagraphs(allQst[id].category, allQst[id].question)}
          <div className="answers-list">
            { shuffledQuests[id].map((quest, i) => {
              const type = allQst[id].correct_answer === quest ? 'correct' : 'wrong';
              const test = type === 'correct' ? `${type}-answer` : `${type}-answer-${i}`;
              console.log(type, test);
              return (
                <button
                  key={ i }
                  type="button"
                  data-testid={ test }
                  id={ type }
                  onClick={ this.handleScore }
                  className={ answered ? type : 'secret' }
                  disabled={ answered }
                >
                  { quest }
                </button>
              );
            })}
          </div>
          { this.renderCountDown() }
        </div>
        { answered && this.renderNextButton() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveScoreInfo: (payload) => dispatch(saveScore(payload)),
});

export default connect(null, mapDispatchToProps)(Questions);

Questions.propTypes = {
  saveScoreInfo: PropTypes.func.isRequired,
};
