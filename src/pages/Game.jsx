import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionState: [false, true, true, true, true],
      timer: 30,
    };

    this.questionMapper = this.questionMapper.bind(this);
    this.questionClick = this.questionClick.bind(this);
    this.questionRender = this.questionRender.bind(this);
    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  resetTimer() {
    this.setState({
      timer: 30,
    });
  }

  disableButton() {
    const { timer } = this.state;
    if (timer <= 0) {
      return true;
    }
    return false;
  }

  questionClick({ target }) {
    const { questionState } = this.state;
    this.resetTimer();
    const questsStatus = questionState.map((quest, index) => {
      if (index === parseInt(target.name, 10) + 1) {
        return false;
      }
      quest = true;
      return quest;
    });
    this.setState({
      questionState: [...questsStatus],
    });
  }

  questionRender() {
    const { questionState } = this.state;
    const questionArray = this.questionMapper();
    const shouldRender = questionArray.map((elem, index) => {
      if (!questionState[index]) return elem;
      return null;
    });
    return shouldRender;
  }

  questionMapper() {
    const { questions } = this.props;
    const allQuestions = questions.map((question, index) => (
      <div key={ index }>
        <h1>
          <span data-testid="question-category">{question.category}</span>
        </h1>
        <h2>
          <span data-testid="question-text">{question.question}</span>
        </h2>
        <ul>
          <li>
            <button
              name={ index }
              data-testid="correct-answer"
              type="button"
              onClick={ this.questionClick }
              disabled={ this.disableButton() }
            >
              {question.correct_answer}
            </button>
          </li>
          {question.incorrect_answers.map((incorrect, ind) => (
            <li key={ ind }>
              <button
                name={ index }
                data-testid={ `wrong-answer-${ind}` }
                type="button"
                onClick={ this.questionClick }
                disabled={ this.disableButton() }
              >
                {incorrect}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ));
    return allQuestions;
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <Header />
        <div>
          <h1>
            <span data-testid="timer">{timer}</span>
          </h1>
          <div>
            {this.questionRender()}
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  loading: state.questions.loading,
});

export default connect(mapStateToProps)(Game);
