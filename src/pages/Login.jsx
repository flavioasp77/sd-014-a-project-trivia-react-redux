import React from 'react';
import { Link } from 'react-router-dom';

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
      <div>
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
        </form>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
