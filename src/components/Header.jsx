import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.headerDisplay = this.headerDisplay.bind(this);
  }

  componentDidMount() {
    this.headerDisplay();
  }

  componentDidUpdate() {
    this.headerDisplay();
  }

  headerDisplay() {
    const player = JSON.parse(localStorage.getItem('state'));
    const { username, score, gravatarEmail } = player;
    return (
      <>
        <h3 data-testid="header-player-name">{username}</h3>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` } alt="Gravatar" />
        <h4 data-testid="header-score">{score}</h4>
      </>
    );
  }

  render() {
    return (
      <header>
        { this.headerDisplay() }
      </header>
    );
  }
}

export default Header;
