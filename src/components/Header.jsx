import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    const hash = md5(email.trim().toLowerCase()).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header>
        <img
          alt="Player Gravatar"
          data-testid="header-profile-picture"
          src={ gravatar }
        />
        <span data-testid="header-player-name">
          Jogador:
          {name}
        </span>
        <span data-testid="header-score">Pontuação: 0</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
