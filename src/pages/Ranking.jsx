import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';

class Ranking extends Component {
  getFromLocal() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    const finalRanking = localRanking.sort((a, b) => b.score - a.score);
    return (
      finalRanking.map(({ name, picture, score }, index) => (
        <li key={ index }>
          <div className="ranking-image">
            <h1>{`${index + 1}°`}</h1>
            <img src={ picture } alt={ `Avatar de ${name}` } />
          </div>
          <div className="ranking-user">
            <p data-testid={ `player-name-${index}` }>{ name}</p>
            <p data-testid={ `player-score-${index}` }>{ score }</p>
          </div>
        </li>))
    );
  }

  render() {
    return (
      <div className="ranking-background">
        <h2 data-testid="ranking-title">Ranking!</h2>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Jogar Novamente!</button>
        </Link>
        <ul>
          {this.getFromLocal()}
        </ul>
      </div>
    );
  }
}

export default Ranking;
