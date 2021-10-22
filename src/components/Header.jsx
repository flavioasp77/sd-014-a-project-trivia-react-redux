import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { username } = this.props;
    return (
      <>
        <img src="" alt="imagem" data-testid="header-profile-picture" />
        <div>
          <p data-testid="header-player-name">
            { username }
          </p>
          <p data-testid="header-score">
            0
          </p>
        </div>
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
