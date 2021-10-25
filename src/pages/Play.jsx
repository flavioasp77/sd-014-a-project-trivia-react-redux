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
      questionIndex: 0,
      score: 0,
      shouldShowAnswer: false,
      timer: 30,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.onAnswerClick = this.onAnswerClick.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) clearInterval(this.counter);
  }

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  onAnswerClick({ target }) {
    const { data } = this.props;
    const { results } = data;

    const question = document.querySelector('.question-text').innerText;
    const { difficulty, correct_answer: correctAnswer } = results.find(
      (curr) => curr.question === question,
    );
    const multiplier = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    if (target.innerText === correctAnswer) {
      this.whenAnswersCorrectly(difficulty, multiplier);
    }

    this.setState({ shouldShowAnswer: true, timer: 0 });
  }

  setTimer() {
    const ONE_SECOND = 1000;
    this.counter = setInterval(() => {
      this.setState(({ timer }) => ({ timer: timer - 1 }));
    }, ONE_SECOND);
  }

  whenAnswersCorrectly(difficulty, multiplier) {
    const { score, timer } = this.state;
    const POINTS_PER_CORRECT = 10;
    const { player } = JSON.parse(localStorage.getItem('state'));

    const newScore = score + (POINTS_PER_CORRECT + timer * multiplier[difficulty]); // Calculate the new score
    this.setState({ score: newScore }); // Update the score in the state

    localStorage.setItem(
      // Update the score in the localStorage
      'state',
      JSON.stringify({
        player: {
          ...player,
          assertions: player.assertions + 1,
          score: newScore,
        },
      }),
    );
  }

  nextQuestion() {
    this.setState({ timer: 30 });
    // Reset the timer when the user clicks on the next question
    this.updateQuestionIndex();
    this.setTimer();
  }

  updateQuestionIndex() {
    const { data, history } = this.props;
    const { results } = data;

    this.setState(({ questionIndex }) => {
      const newIndex = questionIndex === results.length - 1 ? 0 : questionIndex + 1;

      if (newIndex === 0) {
        this.saveScoreToRankings();
        history.push('/feedback');
      }

      return {
        questionIndex: newIndex,
        shouldShowAnswer: false,
      };
    });
  }

  saveScoreToRankings() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail: picture, name, score } = player;

    const rankings = JSON.parse(localStorage.getItem('rankings'));
    if (!rankings) localStorage.setItem('rankings', JSON.stringify([]));
    // If there is no rankings in localStorage, create an empty array

    localStorage.setItem(
      'rankings',
      JSON.stringify([
        ...JSON.parse(localStorage.getItem('rankings')), // Fill the array with the existing rankings
        {
          name,
          picture,
          score,
        },
      ]),
    );
  }

  render() {
    const { data } = this.props;
    const { questionIndex, score, shouldShowAnswer, timer } = this.state;

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
        <Header score={ score } />
        <QuestionCard
          data={ results[questionIndex] }
          nextQuestion={ this.nextQuestion }
          onAnswerClick={ this.onAnswerClick }
          shouldShowAnswer={ shouldShowAnswer }
          timer={ timer }
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
