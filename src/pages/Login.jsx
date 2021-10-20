import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    return(
      <section>
        <br />
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            id="input-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <label htmlFor="input-email">
          Email:
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="input-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <button type="button" data-testid="btn-play">Jogar</button>
      </section>
    );
  }
}

export default Login;
