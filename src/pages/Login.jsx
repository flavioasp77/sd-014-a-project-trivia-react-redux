import React, { Component } from 'react';
import Input from '../components/Input';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      isEmailValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value },
      () => {
        const { email } = this.state;
        const enableEmail = this.validateEmail(email);
        this.setState({ isEmailValid: enableEmail });
      });
  }

  render() {
    const { username, email, isEmailValid } = this.state;
    const minChar = 1;
    return (
      <div>
        <Input
          type="text"
          id="username"
          dataTestId="input-player-name"
          value={ username }
          onChange={ this.handleChange }
        />
        <Input
          type="email"
          id="email"
          dataTestId="input-gravatar-email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !(username.length >= minChar && isEmailValid) }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
