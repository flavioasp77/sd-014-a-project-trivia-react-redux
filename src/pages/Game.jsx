import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      source: '',
    };
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
    const { email } = this.props;
    const hash = this.convertEmailtoHash(email);

    const source = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    this.setState({ source: source.url });
  }

  render() {
    const { nome } = this.props;
    const { source } = this.state;
    return (
      <>
        <header>
          <div data-testid="header-player-name">{ nome }</div>
          <img
            data-testid="header-profile-picture"
            src={ source }
            alt="gravatar"
          />
          <div data-testid="header-score">0</div>
        </header>
        <Questions />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
  token: state.token.success,
});

Game.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
