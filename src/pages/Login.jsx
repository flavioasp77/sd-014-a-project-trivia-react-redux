/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveToken, createUserLocalStorage } from '../services/localStorage';
import { setGravatarEmail, setUsername } from '../redux/actions';
import trivia from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  generateUser() {
    const { username, email } = this.state;
    const state = {
      player: {
        name: username,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    createUserLocalStorage(state);
  }

  async handleClick() {
    const { dispatchGravatarEmail, dispatchUsername, history } = this.props;
    const { email, username } = this.state;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    saveToken(token);
    dispatchGravatarEmail(email);
    dispatchUsername(username);
    this.generateUser();
    history.push('/game');
  }

  render() {
    const { username, email } = this.state;
    const { history } = this.props;
    const buttonDisabled = !(username.length > 0 && email.length > 0);
    return (
      <main
        className="d-flex justify-content-center align-items-center vh-100"
        style={ { backgroundColor: '#F9F9F9' } }
      >
        <section
          className="d-flex flex-column justify-content-center align-items-center
          border rounded bg-white"
          style={ { width: '80vh', height: '60vh' } }
        >
          <img
            src={ trivia }
            alt="logo"
            style={ { width: '300px', height: '300px' } }
            className="mt-5 mb-3"
          />
          <form className="d-flex flex-column justify-content-center align-items-center">
            <input
              data-testid="input-player-name"
              type="text"
              className="mb-1 form-control"
              name="username"
              placeholder="Username"
              value={ username }
              onChange={ this.handleChange }
            />
            <input
              data-testid="input-gravatar-email"
              type="text"
              placeholder="Email"
              className="mb-3 form-control"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <button
              data-testid="btn-play"
              className="btn btn-primary w-100 mb-2"
              type="button"
              disabled={ buttonDisabled }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100 mb-5"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
            >
              Configurações
            </button>
          </form>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  dispatchGravatarEmail: PropTypes.func.isRequired,
  dispatchUsername: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGravatarEmail: (email) => dispatch(setGravatarEmail(email)),
  dispatchUsername: (username) => dispatch(setUsername(username)),
});

export default connect(null, mapDispatchToProps)(Login);
