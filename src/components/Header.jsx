import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';

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
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.imgGravatar(getEmail) }
          alt="Gravatar do player"
        />
        <p data-testid="header-player-name">{getName}</p>
        <p
          data-testid="header-score"
        >
          {JSON.parse(localStorage.getItem('state')).player.score || 0}
        </p>
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
});

export default connect(mapStateToProps)(Header);
