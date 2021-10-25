import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const emailHash = MD5(email).toString();

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt="gravatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p>
          score:
          <span
            data-testid="header-score"
          >
            { score }
          </span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
  score: state.userReducer.score,
});

export default connect(mapStateToProps, null)(Header);
