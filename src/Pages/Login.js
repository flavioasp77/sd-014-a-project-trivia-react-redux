import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { emailValidation, loginValidation } from '../helper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      login: '',
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleLogin = () => {

  }

  handleDisabled = (email, login) => {
    if (emailValidation(email) && loginValidation(login)) {
      return false;
    }
    return true;
  }

  render() {
    const { email, login } = this.state;
    return (
      <form>
        <label htmlFor="login">
          <input
            type="text"
            id="login"
            name="login"
            placeholder="login"
            data-testid="input-player-name"
            value={ login }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email@email.com"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleLogin }
          data-testid="btn-play"
          disabled={ this.handleDisabled(email, login) }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default connect(null, null)(Login);
