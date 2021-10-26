import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { readLocalStorage } from '../services/util';

class Ranking extends Component {
  render() {
    const players = readLocalStorage('ranking').sort((a, b) => b.score - a.score);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          {players.map((player, index) => (
            <li key={ index }>
              <img
                src={ player.picture }
                data-testid="header-profile-picture"
                alt="gravatar"
              />
              <p data-testid={ `player-name-${index}` }>{ player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </li>
          ))}
        </ol>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
