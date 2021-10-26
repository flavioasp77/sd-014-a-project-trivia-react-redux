import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userName, thumbnail, currentScore } = this.props;

    return (
      <>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ thumbnail }
            alt={ `${userName} thumbnail` }
          />
          <span data-testid="header-player-name">
            { userName }
          </span>
        </div>
        <span data-testid="header-score">{ currentScore }</span>
      </>
    );
  }
}

Header.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  currentScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  thumbnail: state.player.thumbnail,
  currentScore: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
