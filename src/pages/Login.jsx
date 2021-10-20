import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    return (
      <main>
        <h3>Nome Do Jogador:</h3>
        <input
          value={ name }
          onChange={ this.handleInput }
          type="text"
          name="name"
          data-testid="input-player-name"
        />
        <h3>Email Do Gravatar:</h3>
        <input
          value={ email }
          onChange={ this.handleInput }
          type="text"
          name="email"
          data-testid="input-gravatar-email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ email.length <= 1 || name.length <= 1 }
        >
          Jogar
        </button>
      </main>
    );
  }
}

export default Login;
