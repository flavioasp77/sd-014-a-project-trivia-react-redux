import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Ranking extends Component {
  render() {
    const arrayPlayers = JSON.parse(localStorage.getItem('ranking'));
    arrayPlayers.sort((a, b) => b.score - a.score);
    const { history } = this.props;
    return (
      <main>
        <h2 data-testid="ranking-title">Raking</h2>
        {arrayPlayers.map((item, index) => (
          <div key={ index }>
            <img src={ item.picture } alt="raking" />
            <h3 data-testid={ `player-name-${index}` }>{item.name}</h3>
            <span data-testid={ `player-score-${index}` }>{item.score}</span>
          </div>
        ))}
        <button
          onClick={ () => history.push('/') }
          type="button"
          data-testid="btn-go-home"
        >
          Voltar
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
