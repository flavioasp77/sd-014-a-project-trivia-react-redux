import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email.trim().toLowerCase()).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatar }
          alt="Player Gravatar"
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
  name: state.user.name,
  email: state.user.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
