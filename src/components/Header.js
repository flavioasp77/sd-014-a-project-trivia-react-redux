import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { addLoginUser } from '../actions';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const hashGerada = md5(email.trim().toLowerCase()).toString();
    const gravatarAvatar = `https://www.gravatar.com/avatar/${hashGerada}`;

    return (
      <header>
        <img data-testid="header-profile-picture" src={ gravatarAvatar } alt="Player" />
        <span data-testid="header-player-name">
          Jogador:
          { name }
        </span>
        <span data-testid="header-score">
          Pontuação:
          0
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.shape({
    trim: PropTypes.func,
  }),
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  userInfo: (payload) => dispatch(addLoginUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
