import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import logo from '../trivia.png';
import '../css/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick({ target }) {
    console.log(target);
  }

  render() {
    const { handleInput, handleClick } = this;
    const { nameInput, emailInput } = this.state;

    return (
      <div className="login__container">
        <div className="login">
          <img src={ logo } className="logo" alt="Logo" height="80px" />
          <Input
            dataTestId="input-player-name"
            id="name"
            name="nameInput"
            label="Nome"
            onChange={ handleInput }
          />
          <Input
            dataTestId="input-gravatar-email"
            id="email"
            name="emailInput"
            label="Email"
            onChange={ handleInput }
            type="email"
          />
          <Button
            dataTestId="btn-play"
            disabled={ nameInput.length === 0 || emailInput.length === 0 }
            onClick={ handleClick }
            value="Jogar"
          />
        </div>
      </div>
    );
  }
}

export default connect()(Login);
