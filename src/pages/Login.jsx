import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
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
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            configuração do jogo
          </button>
        </Link>
      </main>
    );
  }
}

export default Login;
