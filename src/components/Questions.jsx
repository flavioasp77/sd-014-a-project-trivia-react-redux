import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/questions.css';
import { scores, timerCount } from '../redux/actions';
import ButtonsQuestions from './ButtonsQuestions';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      order: 0,
      Nquestions: 0,
      click: false,
      timer: 30,
      score: 0,
    };

    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.questionDifficulty = this.questionDifficulty.bind(this);
    this.buttonsAnswers = this.buttonsAnswers.bind(this);
    this.feedback = this.feedback.bind(this);
    this.scoreChange = this.scoreChange.bind(this);
  }

  componentDidMount() {
    const SECOND = 1000;
    this.buttonsAnswers();
    this.timeOut = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, SECOND);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { timerAction } = this.props;
    if (timer === 0) {
      clearInterval(this.timeOut);
      timerAction(timer);
    }
  }

  questionDifficulty() {
    let difficultyQues = 0;
    const MAX_DIFF = 3;
    const { results } = this.props;
    const { Nquestions } = this.state;
    const diffi = results[Nquestions].difficulty;

    if (diffi === 'easy') {
      difficultyQues = 1;
    } else if (diffi === 'medium') {
      difficultyQues = 2;
    } else {
      difficultyQues = MAX_DIFF;
    }
    return difficultyQues;
  }

  buttonsAnswers() {
    const MAX_ANSWERS = 4;
    const aleatoryButton = Math.floor(Math.random() * MAX_ANSWERS);
    this.setState({
      order: aleatoryButton,
    });
  }

  feedback() {

  }

  handleNextButton() {
    const { Nquestion } = this.state;
    this.feedback();
    const MAX_QUESTIONS = 4;
    const { history } = this.props;
    if (Nquestion === MAX_QUESTIONS) {
      history.push('/feedback');
    }
    this.buttonsAnswers();
    this.setState({
      Nquestion: Nquestion + 1,
      click: false,
      timer: 30,
    });

    const SECOND = 1000;
    this.timeOut = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, SECOND);
  }

  handleClickAnswer() {
    const { timerAction } = this.props;
    const { timer } = this.state;
    this.setState({
      click: true,
    });
    clearInterval(this.timeOut);
    timerAction(timer);
  }

  scoreChange() {
    const { score, timer } = this.state;
    const rightAnswer = 10;
    const { scoreCount } = this.props;

    this.handleClickAnswer();
    const difficulty = this.questionDifficulty();
    scoreCount(score + rightAnswer + (timer * difficulty));
    this.setState({
      score: score + rightAnswer + (timer * difficulty),
    });
    const storageUser = JSON.parse(localStorage.getItem('state'));
    storageUser.user.score = score + rightAnswer + (timer * difficulty);
    storageUser.user.assertions += 1;
    localStorage.state = JSON.stringify(storageUser);
  }

  render() {
    const { results, isFetching } = this.props;
    const { Nquestions, order, click, timer } = this.state;
    if (isFetching) return <h3>Loading...</h3>;
    return (
      <div>
        <section>
          <h4 data-testid="question-category">
            {
              results[Nquestions].category
            }

          </h4>
          <p>{ timer }</p>
          <p data-testid="question-text">
            {
              results[Nquestions].question
            }
          </p>
        </section>
        <ButtonsQuestions
          order={ order }
          handleClickanswer={ this.handleClickAnswer }
          score={ this.scoreChange }
          click={ click }
          Nquestions={ Nquestions }
          results={ results }
          handleNextButton={ this.handleNextButton }
          timer={ timer }
        />
      </div>
    );
  }
}

Questions.propTypes = {
  scoreCount: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
  timerAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.questions.response,
  isFetching: state.questions.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  timerAction: (timer) => (dispatch(timerCount(timer))),
  scoreCount: (score) => (dispatch(scores(score))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
