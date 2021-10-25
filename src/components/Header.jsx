import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component { // comentario
  render() {
    const { nome, scr, email } = this.props;
    const emailUsuario = md5(email).toString();
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${emailUsuario}` } data-testid="header-profile-picture" alt="gravatar" />
        <span data-testid="header-player-name">{ nome }</span>
        <p data-testid="header-score">{ scr }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  scr: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.user.name,
  email: state.user.email,
  scr: state.score.score,
});

export default connect(mapStateToProps)(Header);
