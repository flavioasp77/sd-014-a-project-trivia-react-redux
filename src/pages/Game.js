import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const userHash = md5(player.gravatarEmail).toString();
    return (
      <Header src={ userHash } player={ player.name } score="0" />
    );
  }
}

export default Game;
