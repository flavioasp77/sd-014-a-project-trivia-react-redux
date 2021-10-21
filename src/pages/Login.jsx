import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value }, () => { this.handleValidation(); });
  }

  handleValidation() {
    const { name, email } = this.state;

    if (name && email) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
