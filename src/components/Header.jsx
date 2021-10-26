import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, score, email } = this.props;
    const userEmail = md5(email).toString();
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${userEmail}` } data-testid="header-profile-picture" alt="gravatar" />
        <span data-testid="header-player-name">{ name }</span>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user: { name, email }, score: { score } }) => ({
  name,
  email,
  score,
});

export default connect(mapStateToProps)(Header);
