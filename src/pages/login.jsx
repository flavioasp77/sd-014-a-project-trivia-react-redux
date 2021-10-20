import React from 'react';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInfo = this.verifyInfo.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyInfo() {
    const { email, name } = this.state;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (validEmail.test(email) && name) return false;

    return true;
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ!
          </p>
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                name="name"
                id="name"
                value={ name }
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                id="email"
                value={ email }
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ this.verifyInfo() }
            >
              Jogar
            </button>
          </form>
        </header>
      </div>
    );
  }
}

export default Login;
