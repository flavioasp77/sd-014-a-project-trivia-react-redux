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
    return (
      <div className="flex justify-center space-x-20 items-center py-2 bg-gray-700">
        <img className="rounded-full h-12 w-12" data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Gravatar" />
        <h3>
          <span data-testid="header-player-name">{username}</span>
        </h3>
        <h4>
          Score:
          {' '}
          <span data-testid="header-score">{score}</span>
        </h4>
      </div>
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
