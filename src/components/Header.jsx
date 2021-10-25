import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/">
              <Img src={ logo } alt="Logo" />
            </Link>
            <span data-testid="header-score">
              Score:
              {score}
            </span>
          </div>

          <div className="header__right">
            <span data-testid="header-player-name">
              Jogador:
              {player}
            </span>

            <Img dataTestId="header-profile-picture" src={ src } alt="Avatar" />
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
