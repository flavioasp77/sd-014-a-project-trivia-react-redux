import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import '../utils/localstorage';
import md5 from 'crypto-js/md5';

// md5(emailDoUsuário).toString();
// https://www.gravatar.com/avatar/${hash-gerada}
class Header extends Component {
  componentDidMount() {
  }

  render() {
    const { player: { gravatarEmail, name, score } } = localStorage.getObj('state');
    const hashEmail = md5(gravatarEmail).toString();
    const imgPath = `https://www.gravatar.com/avatar/${hashEmail}`;
    return (
      <header>
        <img
          src={ imgPath }
          alt="Foto do usuário"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

export default Header;
