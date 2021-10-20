import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveToken } from '../services/localStorage';
import { setGravatarEmail, setUsername } from '../redux/actions';

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

  async handleClick() {
    const { dispatchGravatarEmail, dispatchUsername, history } = this.props;
    const { email, username } = this.state;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    saveToken(token);
    dispatchGravatarEmail(email);
    dispatchUsername(username);
    history.push('/game');
  }

  render() {
    const { username, email } = this.state;
    const { history } = this.props;
    const buttonDisabled = !(username.length > 0 && email.length > 0);
    return (
      <main>
        <h1>Login</h1>
        <form>
          <label htmlFor="email">
            Username:
            <input
              data-testid="input-player-name"
              type="text"
              name="username"
              value={ username }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Email:
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
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
