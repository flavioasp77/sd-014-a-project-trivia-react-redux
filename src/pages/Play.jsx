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
      seconds: 5,
      shouldShowAnswer: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.counter = setInterval(() => {
      this.setState(({ seconds }) => ({ seconds: seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) clearInterval(this.counter);
  }

  nextQuestion() {
    this.setState(({ answerIndex }) => {
      const { data, history } = this.props;
      const { results } = data;
      const newIndex = answerIndex === results.length - 1 ? 0 : answerIndex + 1;

      if (newIndex === 0) {
        history.push('/feedback');
      }

      return {
        answerIndex: newIndex,
        shouldShowAnswer: false,
      };
    });
  }

  showAnswer() {
    this.setState({ shouldShowAnswer: true });
  }

  render() {
    const { data } = this.props;
    const { answerIndex, seconds, shouldShowAnswer } = this.state;

    const { response_code: responseCode, results } = data;

    if (responseCode !== 0) {
      return (
        <div className="container">
          <p className="text-center">Token expirado!</p>
          <Link className="btn-return" to="/">
            VOLTAR
          </Link>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <QuestionCard
          data={ results[answerIndex] }
          nextQuestion={ this.nextQuestion }
          // shouldShowAnswer={ shouldShowAnswer }
          shouldShowAnswer={ (seconds === 0) ? true : shouldShowAnswer }
          // Solution to the problem of showing the answer after the timer
          showAnswer={ this.showAnswer }
        />
        <p className="timer">{`Tempo: ${seconds}`}</p>
      </div>
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
