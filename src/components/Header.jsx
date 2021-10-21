import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

import { getPlayerInfo } from '../services/playerInfo';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      score: 0,
      imgSrc: null,
    };
    this.getPlayer = this.getPlayer.bind(this);
  }

  componentDidMount() {
    this.getPlayer();
  }

  getPlayer() {
    const player = getPlayerInfo();
    const { name, email, score } = player;
    const emailMd5 = md5(email).toString();
    this.setState({
      name,
      score,
      imgSrc: `https://www.gravatar.com/avatar/${emailMd5}`,
    });
  }

  render() {
    const { name, score, imgSrc } = this.state;
    return (
      <div className="trivia-header d-flex justify-content-between mb-5">
        <img src={ imgSrc } alt={ name } data-testid="header-profile-picture" />
        <p className="th-name">
          User:
          { ' ' }
          <span data-testid="header-player-name">{ name }</span>
        </p>
        <p className="th-score">
          Score:
          { ' ' }
          <span data-testid="header-score">{ score }</span>
        </p>
      </div>
    );
  }
}

export default Header;
