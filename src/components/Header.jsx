import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {},
      hashInfo: '',
    };
  }

  componentDidMount() {
    this.playerInfoStart();
  }

  playerInfoStart() {
    const player = JSON.parse(localStorage.getItem('state'));
    const hashInfo = md5(player.gravatarEmail).toString();
    this.setState({
      player,
      hashInfo,
    });
  }

  render() {
    const { player, hashInfo } = this.state;
    console.log('Objeto player (Depois apagar) -- components/header:', player);
    return (
      <header>
        <img
          alt="Profile"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashInfo}` }
        />
        <span data-testid="header-player-name">{ player.name }</span>
        <span data-testid="header-score">{ player.score }</span>
      </header>
    );
  }
}

export default (Header);
