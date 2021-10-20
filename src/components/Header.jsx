import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <img src="" alt="user" data-testid="header-profile-picture" />
        <span>
          Jogador:
          <span data-testid="header-player-name">
            { name }
          </span>
        </span>
        <span>
          Pontos:
          <span data-testid="header-score">
            0
          </span>
        </span>
      </>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
});

export default connect(mapStateToProps, null)(Header);
