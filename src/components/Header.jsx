import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <>
        <img src="" alt="user" data-testid="header-profile-picture" />
        <span>
          Jogador:
          <span data-testid="header-player-name">
            { name }
          </span>
        </span>
        <span>
          Pontos:
          <span data-testid="header-score">
            { score }
          </span>
        </span>
      </>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.score.score,
});

export default connect(mapStateToProps, null)(Header);
