import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
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

  async handleClick() {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const JSONObject = await response.json();
      const token = await JSONObject.token;
      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
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
            <Link to="/game">
              <button
                type="button"
                data-testid="btn-play"
                onClick={ this.handleClick }
                disabled={ this.validateEmail() }
              >
                Jogar
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default login;
