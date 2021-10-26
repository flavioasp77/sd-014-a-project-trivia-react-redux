import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import triviaLogo from '../trivia.png';
import gravatarImg from '../services/gravatarApi';

class Header extends Component {
  render() {
    const { name, score, email } = this.props;
    const gravatarUserImg = gravatarImg(email);
    return (
      <div className="header">
        <img className="trivia-logo-header" src={ triviaLogo } alt="Logo do App Trivia" />
        <span className="points">
          Pontos:
          <span data-testid="header-score">
            {score}
          </span>
        </span>
        <div className="userInfo">
          <img src={ gravatarUserImg } alt="user" data-testid="header-profile-picture" />
          <span>
            Jogador:
            <span data-testid="header-player-name">
              { name }
            </span>
          </span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.score.score,
});

export default connect(mapStateToProps, null)(Header);
