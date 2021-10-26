import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MD5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.headerDisplay = this.headerDisplay.bind(this);
  }

  headerDisplay() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { username, gravatarEmail } } = state;
    const { score } = this.props;
    const hash = MD5(gravatarEmail).toString();
    console.log(hash);
    return (
      <>
        <h3 data-testid="header-player-name">{username}</h3>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar${hash}` } alt="Gravatar" />
        <h4 data-testid="header-score">{score}</h4>
      </>
    );
  }

  render() {
    return (
      <header>
        <this.headerDisplay />
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.questions.score,
});

export default connect(mapStateToProps)(Header);
