import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, img, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ img }
          alt="Gravatar"
        />
        <span data-testid="header-player-name">
          Jogador:
          {' '}
          { name }
        </span>
        <label htmlFor="score">
          Pontos:
          {' '}
          <span data-testid="header-score" id="score">
            { score }
          </span>
        </label>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ playerReducer: { name, img, score } }) => ({
  name,
  img,
  score,
});

export default connect(mapStateToProps)(Header);
