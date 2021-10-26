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
    const state = {
      player: {
        username,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
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
    await this.playerSaver();
    await this.tokenFetcher();
    await getGame();
    history.push('/game');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div
            className="p-10 rounded-md flex flex-col content-evenly
            items-center border-2 border-gray-700 rounded my-5"
          >
            <img className="App-logo mb-8" src={ logo } alt="logo" />
            <form
              className="flex flex-col py-4 px-2"
            >
              <input
                className="text-center rounded bg-gray-600
                mb-3 text-gray-900 text-opacity-100"
                type="text"
                name="username"
                data-testid="input-player-name"
                placeholder="Nome de usuário"
                onChange={ this.handleChange }
              />
              <input
                className="text-center rounded bg-gray-600 mb-3
                text-gray-900 text-opacity-100"
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                placeholder="Email"
                onChange={ this.handleChange }
              />
              <button
                className="px-2 py-1 rounded text-center bg-blue-700
                opacity-50 hover:opacity-100"
                type="button"
                data-testid="btn-play"
                onClick={ this.handleClick }
                disabled={ this.validateEmail() }
              >
                Jogar
              </button>
            </form>
            <Link to="/settings" data-testid="btn-settings" className="mt-7">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/settings-3.png" alt="configurações" />
            </Link>
          </div>
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
