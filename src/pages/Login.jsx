import React, { Component } from 'react';
import fetchToken from '../services/fetchToken';
// import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    // const { history } = this.props;

    fetchToken();
    console.log('click');

    // history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <main>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nome"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            name="email"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ !(name && email) }
          onClick={ this.handleClick }
          data-testid="btn-play"
        >
          Jogar
        </button>
      </main>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({ });

// export default connect(null, mapDispatchToProps)(Login);
export default Login;
