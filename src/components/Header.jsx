import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userName, thumbnail } = this.props;

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
        <span data-testid="header-score"> Placar: 0</span>
      </>
    );
  }
}

Header.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  thumbnail: state.player.thumbnail,
});

export default connect(mapStateToProps, null)(Header);
