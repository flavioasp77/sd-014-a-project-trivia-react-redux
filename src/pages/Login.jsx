import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loginUser as loginUserAction,
  fetchGetToken as fetchGetTokenAction,
} from '../actions';
import settings from '../images/settings.svg';
import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    const { fetchGetToken } = this.props;
    fetchGetToken();
  }

  onLogin() {
    const { history, loginUser } = this.props;
    const { name, email } = this.state;

    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };

    localStorage.setItem('state', JSON.stringify(state)); // Save player state in localStorage
    loginUser(this.state); // Dispatch action to login user (fill redux store)
    history.push('/game'); // Redirect to game
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleDisabled(name, email) {
    return !(name && email);
  }

  render() {
    const { name, email } = this.state;
    return (
      <>
        <header className="login-header">
          <Link data-testid="btn-settings" to="/settings">
            <img alt="settings" className="btn-settings" src={ settings } />
          </Link>
        </header>
        <form className="login-form">
          <label className="login-label" htmlFor="email">
            Email do Gravatar:
            <input
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              onChange={ this.handleChange }
              type="email"
              value={ email }
            />
          </label>
          <label className="login-label" htmlFor="name">
            Nome do Jogador:
            <input
              data-testid="input-player-name"
              id="name"
              name="name"
              onChange={ this.handleChange }
              type="text"
              value={ name }
            />
          </label>
          <button
            className="btn-login"
            data-testid="btn-play"
            disabled={ this.handleDisabled(name, email) }
            onClick={ this.onLogin }
            type="button"
          >
            JOGAR!
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchGetToken: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchGetToken: () => dispatch(fetchGetTokenAction()),
  loginUser: (value) => dispatch(loginUserAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);
