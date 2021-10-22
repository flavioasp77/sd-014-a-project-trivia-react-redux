import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';
import { gravatarAction } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      source: '',
      score: 0,
    };
    this.newScore = this.newScore.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  convertEmailtoHash(email) {
    const hash = md5(email).toString();
    return hash;
  }

  async fetchGravatar() {
    const { email, getGravatar } = this.props;
    const hash = this.convertEmailtoHash(email);
    const source = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    this.setState({ source: source.url });
    getGravatar(source);
  }

  newScore(score) {
    this.setState((prev) => ({ score: prev.score + score }));
    const storeLocal = JSON.parse(localStorage.getItem('state'));
    const { player } = storeLocal;
    const attStore = { player:
      {
        ...player,
        score: player.score + score,
        assertions: player.assertions + 1,
      },
    };
    localStorage.setItem('state', JSON.stringify(attStore));
  }

  render() {
    const { nome } = this.props;
    const { source, score } = this.state;
    return (
      <>
        <header>
          <div data-testid="header-player-name">{ nome }</div>
          <img
            data-testid="header-profile-picture"
            src={ source }
            alt="gravatar"
          />
          <div data-testid="header-score">{ score }</div>
        </header>
        <Questions updateValue={ this.newScore } />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
  token: state.token.success,
});

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (source) => dispatch(gravatarAction(source)),
});

Game.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  getGravatar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
