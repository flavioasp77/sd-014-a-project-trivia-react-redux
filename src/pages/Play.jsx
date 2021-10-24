import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import '../styles/Play.css';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
      seconds: 30,
      shouldShowAnswer: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) clearInterval(this.counter);
  }

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  setTimer() {
    const ONE_SECOND = 1000;
    this.counter = setInterval(() => {
      this.setState(({ seconds }) => ({ seconds: seconds - 1 }));
    }, ONE_SECOND);
  }

  nextQuestion() {
    const { data, history } = this.props;
    const { results } = data;

    this.setState({ seconds: 30 });
    // Reset the timer when the user clicks on the next question

    this.setState(({ answerIndex }) => {
      const newIndex = answerIndex === results.length - 1 ? 0 : answerIndex + 1;

      if (newIndex === 0) history.push('/feedback');

      return {
        answerIndex: newIndex,
        shouldShowAnswer: false,
      };
    });

    this.setTimer();
  }

  showAnswer() {
    this.setState({ seconds: 0, shouldShowAnswer: true });
  }

  render() {
    const { data } = this.props;
    const { answerIndex, seconds, shouldShowAnswer } = this.state;

    const { response_code: responseCode, results } = data;

    if (responseCode !== 0) {
      return (
        <div className="container-expired">
          <p className="text-center">Token expirado!</p>
          <Link className="btn-return" to="/">
            VOLTAR
          </Link>
        </div>
      );
    }

    return (
      <>
        <Header />
        <QuestionCard
          data={ results[answerIndex] }
          nextQuestion={ this.nextQuestion }
          seconds={ seconds }
          shouldShowAnswer={ shouldShowAnswer }
          // Solution to the problem of showing the answer after the timer
          showAnswer={ this.showAnswer }
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

Play.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Play);
