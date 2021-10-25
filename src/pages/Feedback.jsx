import React, { Component } from 'react';
import Header from '../components/Header';
import LinkButton from '../components/LinkButton';

class Feedback extends Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const minimalAssertion = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          { assertions >= minimalAssertion ? 'Mandou bem!' : 'Podia ser melhor...' }
        </div>
        <div data-testid="feedback-total-question">
          { assertions }
        </div>
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <LinkButton route="/" testid="play-again" name="Jogar novamente" />
        <LinkButton route="/ranking" testid="ranking" name="Ver Ranking" />
      </>
    );
  }
}

export default Feedback;
