import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from './Img';
import logo from '../trivia.png';
import '../css/Header.css';

class Header extends Component {
  render() {
    const { player, score, src } = this.props;
    return (
      <header>
        <div className="header__container">

          <div className="header__left">
            <Img src={ logo } alt="Logo" />
            <span data-testid="header-score">
              Score:
              {score}
            </span>
          </div>

          <div className="header__right">
            <Img dataTestId="header-profile-picture" src={ src } alt="Avatar" />

            <span data-testid="header-player-name">
              Jogador:
              {player}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default Header;
