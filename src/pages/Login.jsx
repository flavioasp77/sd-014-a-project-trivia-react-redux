import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { username, email } = this.state;
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
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
