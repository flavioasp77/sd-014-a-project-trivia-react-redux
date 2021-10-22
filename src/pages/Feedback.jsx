import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {},
    };
    this.handleClickRanking = this.handleClickRanking.bind(this);
    this.handleClickPlayAgain = this.handleClickPlayAgain.bind(this);
  }

  componentDidMount() {
    this.playerInfoStart();
  }

  playerInfoStart() {
    const player = JSON.parse(localStorage.getItem('state'));
    this.setState({
      player,
    });
  }

  handleClickRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  handleClickPlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { player } = this.state;
    const QUESTIONS_THRESHOLD = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {player.assertions < QUESTIONS_THRESHOLD
            ? 'Podia ser melhor...'
            : 'Mandou bem!'}
        </h1>
        <br />
        <br />
        <span data-testid="feedback-total-question">
          {`Você acertou ${player.assertions} questões!`}
        </span>
        <br />
        <span data-testid="feedback-total-score">
          {`Com um total de ${player.score} pontos!`}
        </span>
        <br />
        <button
          type="button"
          name="play-again"
          data-testid="btn-play-again"
          onClick={ this.handleClickPlayAgain }
        >
          Jogar novamente

        </button>
        <button
          type="button"
          name="ranking"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ver Ranking

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default (Feedback);
