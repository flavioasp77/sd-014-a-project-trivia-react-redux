import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from './Img';

class Header extends Component {
  render() {
    const { player, score, src } = this.props;
    return (
      <header className="">
        <div className="">
          <Img
            data-testid="header-profile-picture"
            id=""
            src={ src }
            alt=""
            className=""
          />
          <span data-testid="header-player-name">
            { player }
          </span>
        </div>
        <div className="">
          <span data-testid="header-score">
            { score }
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
};

export default Header;
