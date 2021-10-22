import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {},
    };
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

  render() {
    const { player } = this.state;
    const QUESTIONS_THRESHOLD = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          { player.score >= QUESTIONS_THRESHOLD ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h1>
        <span data-testid="feedback-total-score">{`Seu Placar: ${player.score}`}</span>
        <br />
        <span
          data-testid="feedback-total-question"
        >
          {`Questões Acertadas: ${player.assertions}`}
        </span>
      </div>
    );
  }
}

export default (Feedback);
