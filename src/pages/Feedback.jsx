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
      </div>
    );
  }
}

export default (Feedback);
