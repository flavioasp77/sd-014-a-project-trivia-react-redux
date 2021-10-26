import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { readLocalStorage } from '../services/util';

class Ranking extends Component {
  render() {
    const jogadores = readLocalStorage('ranking');
    const jogadoresOrdenados = jogadores
      .sort((a, b) => b.score - a.score);
    console.log(jogadores);
    console.log(jogadoresOrdenados);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          {jogadoresOrdenados.map((jogador, index) => (
            <li key={ index }>
              <img
                src={ jogador.picture }
                data-testid="header-profile-picture"
                alt="gravatar"
              />
              <p data-testid={ `player-name-${index}` }>{ jogador.name}</p>
              <p data-testid={ `player-score-${index}` }>{jogador.score}</p>
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
