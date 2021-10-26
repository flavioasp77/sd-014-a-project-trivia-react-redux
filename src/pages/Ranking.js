import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

import Img from '../components/Img';
import Button from '../components/Button';

const { player } = JSON.parse(localStorage.getItem('state'));
const userHash = md5(player.gravatarEmail).toString();
const imgLink = `https://www.gravatar.com/avatar/${userHash}`;
export default class Ranking extends Component {
  componentDidMount() {
    this.updateRanking();
  }

  updateRanking() {
    const { ranking } = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    const UPDATED_RANKING = {
      name: player.name,
      score: player.score,
      picture: imgLink,
    };
    localStorage.setItem('ranking', JSON.stringify(UPDATED_RANKING));
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    return (
      <main>
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
