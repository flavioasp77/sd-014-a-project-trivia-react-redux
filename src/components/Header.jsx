import React from 'react';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {},
    };
  }

  componentDidMount() {
    this.playerInfoStart();
  }

  playerInfoStart() {
    const player = JSON.parse(localStorage.getItem('state'));
    this.setState({
      player,
    });
  }

  render() {
    const { player } = this.state;
    console.log('Objeto player (Depois apagar) -- components/header:', player);
    return (
      <header>
        <img
          alt="Profile"
          data-testid="header-profile-picture"
          src={ player.algumacoisa }
        />
        <span data-testid="header-player-name">{ player.name }</span>
        <span data-testid="header-score">{ player.score }</span>
      </header>
    );
  }
}

export default (Header);
