import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName, score, source } = this.props;
    console.log(source);
    return (
      <header>
        <h3 data-testid="header-player-name">{ userName }</h3>
        <img
          data-testid="header-profile-picture"
          src={ source }
          alt="gravatar"
        />
        <p>
          Pontos:
          <span data-testid="header-score">{ score }</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
};

export default Header;
