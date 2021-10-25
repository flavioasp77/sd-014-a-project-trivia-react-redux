import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const orderedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <ul>
          { orderedRanking.map((player, index) => (
            <li key={ index }>
              <img src={ player.gravatarUrl } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </li>
          )) }
        </ul>
        <Link to="/" data-testid="btn-go-home">
          <button type="button">Tela inicial</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
