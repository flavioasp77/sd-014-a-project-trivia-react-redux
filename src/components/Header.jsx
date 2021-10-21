import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPlayerInfo } from '../services/playerInfo';
import { saveScore } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      imgSrc: null,
    };
    this.getPlayer = this.getPlayer.bind(this);
  }

  componentDidMount() {
    this.getPlayer();
    this.checkScore();
  }

  getPlayer() {
    const state = getPlayerInfo();
    const { name, email } = state.player;
    const emailMd5 = md5(email).toString();
    this.setState({
      name,
      imgSrc: `https://www.gravatar.com/avatar/${emailMd5}`,
    });
  }

  checkScore() {
    const { saveScoreInfo } = this.props;
    const ls = JSON.parse(localStorage.getItem('state'));
    saveScoreInfo(ls.player.score);
  }

  render() {
    const { name, imgSrc } = this.state;
    const { score } = this.props;
    return (
      <div className="trivia-header d-flex justify-content-between mb-5">
        <img src={ imgSrc } alt={ name } data-testid="header-profile-picture" />
        <p className="th-name">
          User:
          { ' ' }
          <span data-testid="header-player-name">{ name }</span>
        </p>
        <p className="th-score">
          Score:
          { ' ' }
          <span data-testid="header-score">{ score }</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.trivia.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveScoreInfo: (payload) => dispatch(saveScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  score: PropTypes.number.isRequired,
  saveScoreInfo: PropTypes.func.isRequired,
};
