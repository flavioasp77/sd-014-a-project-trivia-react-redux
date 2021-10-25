import React from 'react';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      score: 0,
    };
    this.headerDisplay = this.headerDisplay.bind(this);
  }

  componentDidMount() {
    this.somaScore();
  }

  somaScore() {
    const player = JSON.parse(localStorage.getItem('state'));
    const { username, score } = player;
    this.setState({
      username,
      score,
    });
  }

  headerDisplay() {
    const { score, username } = this.state;
    return (
      <>
        <h3 data-testid="header-player-name">{username}</h3>
        <img data-testid="header-profile-picture" src="idk" alt="Gravatar" />
        <h4 data-testid="header-score">{score}</h4>
      </>
    );
  }

  render() {
    return (
      <header>
        {/* { this.headerDisplay() } */}
        <this.headerDisplay />
      </header>
    );
  }
}

export default Header;
