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
    const { name, score } = this.props;
    return (
      <div>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ this.gravatarAvatar() }
            alt={ `${name} avatar` }
          />
          <div>
            <h3 data-testid="header-player-name">
              Jogador:
              { name }
            </h3>
          </div>
        </div>
        <div>
          <h4 data-testid="header-score">
            Placar:
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
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name,
  gravatarEmail,
  score,
});

export default connect(mapStateToProps)(Header);
