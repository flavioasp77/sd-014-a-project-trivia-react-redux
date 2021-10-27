import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { usuario, score } = this.props;
    const email = md5(usuario.email).toString();
    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${email}` } alt="" />
        <div data-testid="header-player-name">
          jogador:
          { usuario.name }
        </div>
        <div data-testid="header-score">
          Placar :
          {score}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.user,
});

Header.propTypes = {
  usuario: PropTypes.objectOf(PropTypes.any).isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
