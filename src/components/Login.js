import React, { Component } from 'react';
import { getToken } from '../services/APIrequests';
import { saveToken } from '../services/localStorage';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleChange({ target }) {
    await this.setState({
      [target.name]: target.value,
    });
    this.verifyInputs();
  }

  async handleClick() {
    const tokenReponse = await getToken();
    const { token } = tokenReponse;
    saveToken(token);
  }

  verifyInputs() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <form>
        <label htmlFor="input-name">
          Name
          <input
            id="input-name"
            type="text"
            name="name"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            id="input-email"
            type="email"
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          data-testid="btn-play"
          id="botao-submit"
          onClick={ this.handleClick }
        >
          Jogar

        </button>
      </form>
    );
  }
}

export default Login;
