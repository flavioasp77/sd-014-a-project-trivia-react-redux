import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      button: true,
      checkEmail: false,
      checkName: false,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Usando Regex (https://stackoverflow.com/a/9204568) para verificar formatação do email e salvar no estado a sua validação;
  validateEmail(email) {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.setState({ checkEmail: true }, () => this.validateButton());
    } else { // caso alterado, ele mudará sua a validação para a inicial;
      this.setState({ checkEmail: false }, () => this.validateButton());
    }
  }

  // Verifica se há um ou mais caracteres no nome e salva na estado;
  validateName(name) {
    const minChar = 1;
    if (name.length >= minChar) {
      this.setState({ checkName: true }, () => this.validateButton());
    } else { // caso alterado, ele mudará sua a validação para a inicial;
      this.setState({ checkName: false }, () => this.validateButton());
    }
  }

  // Recebe as validações do Email e Senha para saber se deve ou não mudar o estado do botão;
  validateButton() {
    const { checkEmail, checkName } = this.state;
    return checkEmail && checkName
      ? this.setState({ button: false }) : this.setState({ button: true });
  }

  // Muda o estado de acordo com o que é colocado no input ao mesmo tempo que chama as funções de validação;
  handleChange({ target }) {
    const { id, value } = target;

    this.setState({ [id]: value });

    if (id === 'email') {
      this.validateEmail(value);
    }

    if (id === 'name') {
      this.validateName(value);
    }
  }

  render() {
    const { email, name, button } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            value={ name }
            id="name"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            value={ email }
            id="email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ button }
          type="button"
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
