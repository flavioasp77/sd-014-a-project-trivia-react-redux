import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <img
          src={ users.gravatarEmail }
          data-testid="header-profile-picture"
          alt="avatar-user"
        />
        <p data-testid="header-player-name">
          { `${users.name}` }
          {' '}
        </p>
        <p data-testid="header-score">0</p>
      </div>

    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
});

Header.propTypes = {
  users: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
