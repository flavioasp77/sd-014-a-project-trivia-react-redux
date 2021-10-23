import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      timer: 30,
    };
    this.questionClick = this.questionClick.bind(this);
    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  componentDidMount() { this.timer(); }

  timer() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  resetTimer() { this.setState({ timer: 30 }); }

  disableButton() {
    const { timer } = this.state;
    return (timer <= 0);
  }

  questionClick() { this.setState((prevState) => ({ id: prevState.id + 1 })); }

  render() {
    const { questions, loading } = this.props;
    const { id, timer } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <span data-testid="timer">{timer}</span>
        <h1>
          <span data-testid="question-category">{questions[id].category}</span>
        </h1>
        <h2>
          <span data-testid="question-text">{questions[id].question}</span>
        </h2>
        <ul>
          <li>
            <button
              name="correct-answer"
              data-testid="correct-answer"
              type="button"
              onClick={ this.questionClick }
              disabled={ this.disableButton() }
            >
              {questions[id].correct_answer}
            </button>
          </li>
          {questions[id].incorrect_answers.map((incorrect, ind) => (
            <li key={ ind }>
              <button
                name={ `wrong-answer-${ind}` }
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
