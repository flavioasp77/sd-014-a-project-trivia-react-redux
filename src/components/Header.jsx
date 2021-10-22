import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { username } = this.props;
    return (
      <>
        <img src="" alt="user" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">
          { username }
          <h2 data-testid="header-score">
            0
          </h2>
        </h2>
      </>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.user.username,
});

export default connect(mapStateToProps, null)(Header);
