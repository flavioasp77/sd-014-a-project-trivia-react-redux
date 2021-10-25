import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readLocalStorage } from '../services/util';

class Header extends Component { // comentario
  render() {
    const { img, nome } = this.props;
    const player = readLocalStorage('state');
    return (
      <header>
        <img src={ img } data-testid="header-profile-picture" alt="gravatar" />
        <span data-testid="header-player-name">{ nome }</span>
        <p data-testid="header-score">{ player.player.score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  img: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  img: state.user.image,
  nome: state.user.name,
});

export default connect(mapStateToProps)(Header);
