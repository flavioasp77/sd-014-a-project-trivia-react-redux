import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  gravatarAvatar() {
    const { gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { name } = this.props;
    const score = 0;
    return (
      <div>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ this.gravatarAvatar() }
            alt={ `${name} avatar` }
          />
          <div>
            <h3 data-testid="header-player-name">{ name }</h3>
          </div>
        </div>
        <div>
          <h4 data-testid="header-score">
            Placar:&nbsp;
            { score }
          </h4>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
