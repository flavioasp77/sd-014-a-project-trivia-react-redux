import React, { Component } from 'react';
import { getGravatarEmailUrl } from '../services/APIrequests';
import { getStateFromStorage } from '../services/localStorage';

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      name: '',
      score: 0,
    };
  }

  componentDidMount() {
    this.SetStateUrl();
  }

  SetStateUrl() {
    const stateStorage = getStateFromStorage();
    const url = getGravatarEmailUrl + stateStorage.player.gravatarEmail;
    const { name, score } = stateStorage.player;
    this.setState({
      url,
      name,
      score,
    });
  }

  render() {
    const { url, name, score } = this.state;
    return (
      <div>
        <img src={ url } alt="Gravatar Imagem" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{name}</span>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

export default Header;
