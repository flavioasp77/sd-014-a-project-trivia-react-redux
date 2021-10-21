import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.playAgain = this.playAgain.bind(this);
    this.goToRanking = this.goToRanking.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  goToRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const state = localStorage.getItem('state');
    const user = JSON.parse(state);
    const COMPARE_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <main>
          {' '}
          <h1
            data-testid="feedback-text"
          >
            {' '}
            { user.player.assertions >= COMPARE_ASSERTIONS
              ? 'Mandou bem!' : 'Podia ser melhor...'}
            {' '}
          </h1>
          <p>Pontuação Final</p>
          <p data-testid="feedback-total-score">{user.player.score}</p>
          <p>Perguntas Acertadas:</p>
          <p data-testid="feedback-total-question">{user.player.assertions}</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Jogar Novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.goToRanking }
          >
            Ranking
          </button>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
