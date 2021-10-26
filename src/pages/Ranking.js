import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/Img';
import Button from '../components/Button';

export default class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <main>
        <h2 data-testid="ranking-title">Ranking</h2>
        <div className="ranking-container">
          { sortedRanking.map(({ name, score, picture }, index) => (
            <div key={ index }>
              <Img src={ picture } alt="Avatar" />
              <p data-testid="player-name">{ name }</p>
              <p data-testid="player-score">{ score }</p>
            </div>
          )) }
          <Link to="/">
            <Button value="Início" dataTestId="btn-go-home" />
          </Link>
        </div>
      </main>
    );
  }
}
