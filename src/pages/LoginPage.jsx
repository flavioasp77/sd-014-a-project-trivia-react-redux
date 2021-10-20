import React from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gravatarEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  checkInputs() {
    const { name, gravatarEmail } = this.state;
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !name.length || !checkEmail.test(gravatarEmail);
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.checkInputs() }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default LoginPage;
