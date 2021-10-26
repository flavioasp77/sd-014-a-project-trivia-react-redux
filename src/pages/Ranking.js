import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/Img';
import Button from '../components/Button';

export default class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    return (
      <main>
        <h2 data-testid="ranking-title">Ranking</h2>
        <div className="ranking-container">
          <Img src={ ranking[0].picture } alt="Avatar" />
          <p data-testid="player-name">{ ranking[0].name }</p>
          <p data-testid="player-score">{ ranking[0].score }</p>
          <Link to="/">
            <Button value="Início" dataTestId="btn-go-home" />
          </Link>
        </div>
      </main>
    );
  }
}
