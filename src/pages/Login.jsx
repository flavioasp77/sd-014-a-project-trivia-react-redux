import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.playBTNClick = this.playBTNClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  playBTNClick() {
    // Do something
  }

  render() {
    const { userName, email } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            name="userName"
            id="input-player-name"
            data-testid="input-player-name"
            value={ userName }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail:
          <input
            type="text"
            name="email"
            id="input-gravatar-email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.playBTNClick }
          data-testid="btn-play"
          disabled={ !(userName) || !(email) }
        >
          Jogar
        </button>
      </form>);
  }
}

export default Login;
