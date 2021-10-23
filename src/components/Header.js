import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName, infoUser, score } = this.props;
    console.log(infoUser);
    return (
      <header>
        <h3 data-testid="header-player-name">{ userName }</h3>
        <img
          data-testid="header-profile-picture"
          src={ infoUser }
          alt="gravatar"
        />
        <p>
          Pontos:
          <span data-testid="header-score">{score}</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  infoUser: PropTypes.string.isRequired,
};

export default Header;
