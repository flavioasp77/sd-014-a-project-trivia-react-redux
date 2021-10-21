import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.perfilGravatar = this.perfilGravatar.bind(this);
  }

  perfilGravatar() {
    const { emailReceive, nameReceive } = this.props;
    const email = md5(emailReceive).toString();
    return (
      <form>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${email}` }
          alt={ email }
        />
        <div>
          <p data-testid="header-player-name" id="name">{`Nome: ${nameReceive} `}</p>
        </div>
        <div>
          <p data-testid="header-score" id="score">Score: 0</p>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.perfilGravatar()}
      </div>
    );
  }
}

Header.propTypes = {
  emailReceive: PropTypes.string.isRequired,
  nameReceive: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailReceive: state.player.email,
  nameReceive: state.player.name,
});

export default connect(mapStateToProps)(Header);
