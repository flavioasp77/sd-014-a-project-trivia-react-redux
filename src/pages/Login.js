import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      settings: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  verify() {
    const { name, email } = this.state;
    const re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (re.test(email) && name.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    const { name, email, settings } = this.state;
    if (settings) return <Redirect to="/settings" />;
    return (
      <div>
        <fieldset>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.verify() }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.setState({ settings: true }) }
          >
            Configurações
          </button>
        </fieldset>
      </div>
    );
  }
}
