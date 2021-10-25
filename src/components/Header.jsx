import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import '../styles/header.css';

class Header extends Component {
  constructor() {
    super();
    this.imgGravatar = this.imgGravatar.bind(this);
  }

  imgGravatar(email) {
    const link = 'https://www.gravatar.com/avatar/';
    const emailCrypto = MD5(email).toString();
    return link + emailCrypto;
  }

  render() {
    const { getEmail, getName } = this.props;
    return (
      <header className="header-containner">
        <div className="img-name">
          <img
            className="gravatar-img"
            data-testid="header-profile-picture"
            src={ this.imgGravatar(getEmail) }
            alt="Gravatar do player"
          />
          <p className="name-user" data-testid="header-player-name">{getName}</p>
        </div>
        <div className="text-score">
          <p className="score">Score</p>
          <p
            className="score"
            data-testid="header-score"
          >
            { JSON.parse(localStorage.getItem('state')).player.score || 0}
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  getName: state.user.name,
  score: state.game.score,
});

export default connect(mapStateToProps)(Header);
