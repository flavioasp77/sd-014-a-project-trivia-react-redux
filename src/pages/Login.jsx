import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { getQuestions } from '../actions';
import '../App.css';

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playerSaver = this.playerSaver.bind(this);
    this.tokenFetcher = this.tokenFetcher.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validateEmail() {
    const { username, email } = this.state;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (re && username) return false;
    return true;
  }

  playerSaver() {
    const { username, email } = this.state;
    const player = {
      username,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  async tokenFetcher() {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const JSONObject = await response.json();
      const token = await JSONObject.token;
      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  }

  async handleClick() {
    const { getGame, history } = this.props;
    await this.tokenFetcher();
    await this.playerSaver();
    await getGame();
    history.push('/game');
  }

  render() {
    const { username, email } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <Link to="/settings" data-testid="btn-settings">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/settings-3.png" alt="configurações" />
          </Link>
          <img className="App-logo" src={ logo } alt="logo" />
          <form>
            <label htmlFor="name">
              Nome
              <input
                type="text"
                name="username"
                data-testid="input-player-name"
                id="name"
                value={ username }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                id="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ this.validateEmail() }
            >
              Jogar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

login.propTypes = {
  getGame: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getGame: () => {
    dispatch(getQuestions());
  },
});

export default connect(null, mapDispatchToProps)(login);
