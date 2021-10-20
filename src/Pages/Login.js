import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  emailValidation,
  loginValidation,
  getTriviaToken,
  fetchTriviaQuestions,
} from '../helper';

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

  handleLogin = async () => {
    const { history } = this.props;
    const token = await getTriviaToken();
    const questions = await fetchTriviaQuestions(token);
    console.log(questions);
    history.push('/game');
  }

  handleDisabled = (email, login) => {
    if (emailValidation(email) && loginValidation(login)) {
      return false;
    }
    return true;
  }

  render() {
    const { email, login } = this.state;
    const { history } = this.props;
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
        <button
          type="button"
          onClick={ () => history.push('/settings') }
          data-testid="btn-settings"
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, null)(Login);
