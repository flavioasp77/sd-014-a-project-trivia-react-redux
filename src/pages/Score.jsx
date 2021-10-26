import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.getScore = this.getScore.bind(this);
  }

  getScore() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions } = player;
    const MIN_SCORE = 3;
    const goodScore = 'Mandou bem!';
    const badScore = 'Podia ser melhor...';
    return (assertions < MIN_SCORE) ? badScore : goodScore;
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="feedback-text">{ this.getScore() }</h1>
          <h2>
            Acertos:
            <span data-testid="feedback-total-question">{assertions}</span>
          </h2>
          <h2>
            Pontuação:
            <span data-testid="feedback-total-score">{score}</span>
          </h2>
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Score;
