import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user: { name, img } } = this.props;
    return (
      <div>
        <h1 data-testid="header-player-name">
          { name }
        </h1>
        <img
          src={ img }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">
          0
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Header);
