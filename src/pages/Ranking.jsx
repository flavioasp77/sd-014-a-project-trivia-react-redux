import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  getFromLocal() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    const finalRanking = localRanking.sort((a, b) => b.score - a.score);
    return (
      finalRanking.map(({ name, picture, score }, index) => (
        <li key={ index }>
          <img src={ picture } alt={ `Avatar de ${name}` } />
          <p data-testid={ `player-name-${index}` }>{ name}</p>
          <p data-testid={ `player-score-${index}` }>{ score }</p>
        </li>))
    );
  }

  render() {
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking!</h3>
        <ul>
          {this.getFromLocal()}
        </ul>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Go Home!</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
