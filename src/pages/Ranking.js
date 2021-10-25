import React from 'react';
import { Link } from 'react-router-dom';
import { getRanking } from '../services/ranking';

class Ranking extends React.Component {
  render() {
    const ranking = getRanking();

    return (
      <>
        <div data-testid="ranking-title">
          <h2> Ranking </h2>
        </div>
        <div>
          {ranking.sort((a, b) => b.score - a.score).map((player, i) => (
            <div key={ i }>
              <div data-testid={ `player-name-${i}` }>
                { player.name }
              </div>
              <div data-testid={ `player-score-${i}` }>
                { player.score }
              </div>
            </div>
          ))}
        </div>
        <div>
          <Link to="/" type="button" data-testid="btn-go-home">
            Início
          </Link>
        </div>
      </>
    );
  }
}

export default Ranking;
