import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = this.props;
    const { score } = JSON.parse(localStorage.state).player;
    return (
      <div className="d-flex flex-column justify-content-around align-items-center">
        <img
          src={ gravatarEmail }
          data-testid="header-profile-picture"
          className="my-2"
          alt="avatar-user"
        />
        <p
          data-testid="header-player-name"
          className="my-2"
        >
          { `${name}` }
          {' '}
        </p>
        <p
          className="my-2"
        >
          Pontuação
          {' '}
          <span data-testid="header-score">{ score }</span>
        </p>
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
