import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { saveHashImage as saveHashImageAction } from '../redux/actions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {},
      hashInfo: '',
    };
  }

  componentDidMount() {
    this.playerInfoStart();
  }

  playerInfoStart() {
    const { saveHashImage } = this.props;
    const player = JSON.parse(localStorage.getItem('state'));
    const hashInfo = md5(player.gravatarEmail).toString();
    saveHashImage(`https://www.gravatar.com/avatar/${hashInfo}`);
    this.setState({
      player: player.player,
      hashInfo,
    });
  }

  render() {
    const { player, hashInfo } = this.state;
    const { score } = this.props;
    return (
      <header className="cabecalho">
        <img
          alt="Profile"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashInfo}` }
        />
        <span data-testid="header-player-name">{ player.name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Header.propTypes = {
  saveHashImage: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveHashImage: (urlImage) => dispatch(saveHashImageAction(urlImage)),
});

export default connect(null, mapDispatchToProps)(Header);
