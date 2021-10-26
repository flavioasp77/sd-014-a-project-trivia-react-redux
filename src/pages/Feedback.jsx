import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    const numbFeed = 3;
    const feedback = assertions >= numbFeed ? 'Mandou bem!'
      : 'Podia ser melhor...';
    return (
      <>
        <header>
          <Header />
        </header>
        <main>
          <h1 data-testid="feedback-text">{feedback}</h1>
          <h2 data-testid="feedback-total-score">{score}</h2>
          {
            assertions === 0 ? (
              <span>
                Não acertou nenhuma pergunta
                <span data-testid="feedback-total-question">{assertions}</span>
              </span>
            ) : (
              <p>
                Acertou
                {' '}
                <span data-testid="feedback-total-question">{assertions}</span>
                {' '}
                Pergunta(s)
              </p>
            )
          }
        </main>
        <Link to="/" role="button" data-testid="btn-play-again">
          Jogar novamente
        </Link>
        <Link to="/ranking" role="button" data-testid="btn-ranking">
          Ranking
        </Link>
      </>
    );
  }
}

export default Feedback;
