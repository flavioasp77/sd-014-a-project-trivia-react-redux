import React from 'react';
import PropTypes from 'prop-types';

import '../css/Header.css';

class Header extends React.Component {
  render() {
    const { name, score, source } = this.props;
    return (
      <header className="headerFeedback">
        <h3 data-testid="header-player-name">{ name }</h3>
        <img
          data-testid="header-profile-picture"
          src={ source }
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
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
};

export default Header;
