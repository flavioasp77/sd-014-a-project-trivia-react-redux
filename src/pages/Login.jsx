import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { email, name } = this.state;
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  emailValidation() {
    const { email } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(String(email).toLowerCase());
  }

  render() {
    const { name, email } = this.state;
    const validation = !(this.emailValidation()) || name.length < 1;
    return (
      <main>
        <Input
          name="name"
          msg="Nome:"
          value={ name }
          onChange={ this.handleChange }
          dataTestid="input-player-name"
        />
        <Input
          name="email"
          msg="Email:"
          value={ email }
          onChange={ this.handleChange }
          dataTestid="input-gravatar-email"
        />
        <Link to="/game">
          <Button
            label="Jogar"
            onClick={ this.handleClick }
            name={ name }
            emailValidation={ validation }
          />
        </Link>
      </main>
    );
  }
}

export default Login;
