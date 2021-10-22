import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import '../css/Game.css';

class Game extends Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const userHash = md5(player.gravatarEmail).toString();
    return (
      <>
        <Header player={ player.name } score="0" src={ `https://www.gravatar.com/avatar/${userHash}` } />
        <main className="game__container">Tela do Jogo</main>
      </>
    );
  }
}

export default Game;
