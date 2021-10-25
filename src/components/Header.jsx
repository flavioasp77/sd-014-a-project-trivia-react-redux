import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { pictureURL, name, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ pictureURL }
          alt="Player gravatar"
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

Header.propTypes = {
  pictureURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default Header;
