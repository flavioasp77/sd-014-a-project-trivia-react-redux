import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON
      .parse(localStorage.getItem('ranking'))
      .sort((playerA, playerB) => playerB.score - playerA.score);

    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {
            ranking.map((player, i) => (
              <li key={ i } style={ { listStyle: 'none' } }>
                <img src={ player.picture } alt={ `${player.name} Thumbnail` } />
                <span data-testid={ `player-name-${i}` }>{ player.name }</span>
                <p data-testid={ `player-score-${i}` }>{ player.score}</p>
              </li>
            ))
          }
        </ol>
        <Link to="/" role="button" data-testid="btn-go-home">Home</Link>
      </main>
    );
  }
}

export default Ranking;
