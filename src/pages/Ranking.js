import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/Img';
import Button from '../components/Button';
import Footer from '../components/Footer';
import logo from '../trivia.png';
import '../css/Ranking.css';

export default class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <>
        <main className="ranking__container">
          <div className="ranking">
            <img src={ logo } className="logo" alt="Logo" height="80px" />
            <h2 data-testid="ranking-title">Ranking</h2>
            <div>
              { sortedRanking.map(({ name, score, picture }, index) => (
                <div className="ranking__item" key={ index }>
                  <Img src={ picture } alt="Avatar" />
                  <p data-testid="player-name">{ name }</p>
                  <p data-testid="player-score">{ score }</p>
                </div>
              )) }
            </div>
            <Link to="/">
              <Button value="Início" dataTestId="btn-go-home" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
