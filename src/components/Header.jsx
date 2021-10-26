import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { pictureURL, name, score } = this.props;
    return (
      <header>
        <div className="jogado">
          <img
            data-testid="header-profile-picture"
            src={ pictureURL }
            alt="Player gravatar"
            className="img-jogador"
          />
          <h3 data-testid="header-player-name">{ name }</h3>
          <h3 data-testid="header-score">{ score }</h3>
        </div>
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
