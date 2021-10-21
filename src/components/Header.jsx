import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { img, nome } = this.props;
    return (
      <header>
        <img src={ img } data-testid="header-profile-picture" alt="gravatar" />
        <span data-testid="header-player-name">{ nome }</span>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  img: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  img: state.user.image,
  nome: state.user.name,
});

export default connect(mapStateToProps)(Header);
