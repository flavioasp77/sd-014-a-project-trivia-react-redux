import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = this.props;
    const { score } = JSON.parse(localStorage.state).player;
    console.log(JSON.parse(localStorage.state).player.score);
    return (
      <div>
        <img
          src={ gravatarEmail }
          data-testid="header-profile-picture"
          alt="avatar-user"
        />
        <p data-testid="header-player-name">
          { `${name}` }
          {' '}
        </p>
        <p data-testid="header-score">{ score }</p>
      </div>

    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
