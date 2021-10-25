import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { readLocalStorage } from '../services/util';

class Ranking extends Component {
  render() {
    const jogadores = readLocalStorage('state');
    const jogadoresOrdenados = Object.keys(jogadores)
      .sort((a, b) => jogadores[b].score - jogadores[a].score);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          {jogadoresOrdenados.map((jogador, index) => (
            <li key={ index }>
              <img src={ `https://www.gravatar.com/avatar/${md5(jogador).toString()}` } data-testid="header-profile-picture" alt="gravatar" />
              <p data-testid={ `player-name-${index}` }>{jogadores[jogador].name}</p>
              <p data-testid={ `player-score-${index}` }>{jogadores[jogador].score}</p>
            </li>
          ))}
        </ol>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Inicio</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
