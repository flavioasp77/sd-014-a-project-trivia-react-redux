import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { usuario: { email, name } } = this.props;
    const emailUser = md5(email).toString();
    return (
      // Terminar de fazer a lista, comecei mas não finalizei a logica
      <div>
        <h1>Ranking</h1>
        <ul>
          <li>
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailUser}` } alt="" />
            <div data-testid="header-player-name">
              jogador:
              { name }
            </div>
            <div data-testid="header-score">Placar : 0</div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.user,
});

Ranking.propTypes = {
  usuario: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Ranking);
