import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    return (
      <main>
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            id="input-name"
            name="name"
            placeholder="insira seu nome"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email:
          <input
            type="email"
            id="input-email"
            name="email"
            placeholder="grupo2@trybe.com"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !(name.length > 0 && email.length > 0) }
          data-testid="btn-play"
        >
          Jogar

        </button>
      </main>
    );
  }
}

export default Login;
