import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = md5(email.trim().toLowerCase()).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header className="header">
        <div className="header-container">
          <img
            alt="Player Gravatar"
            className="header-profile-picture"
            data-testid="header-profile-picture"
            src={ gravatar }
          />
          <span className="header-player-name" data-testid="header-player-name">
            Jogador:
            {' '}
            {name}
          </span>
        </div>
        <div className="header-score">
          <span>Pontos: </span>
          <span data-testid="header-score">{score}</span>
        </div>
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
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
