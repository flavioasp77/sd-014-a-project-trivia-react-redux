import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import logo from '../trivia.png';
import '../css/Login.css';
import { setToken } from '../redux/actions';

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

  handleClick() {
    const { nameInput, emailInput } = this.state;
    const { addToken } = this.props;
    addToken();
    localStorage.setItem(
      'state',
      JSON.stringify({ player: {
        name: nameInput,
        assertions: 0,
        score: 0,
        gravatarEmail: emailInput,
      } }),
    );
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
          <Link to="/game">
            <Button
              dataTestId="btn-play"
              disabled={ nameInput.length === 0 || emailInput.length === 0 }
              onClick={ handleClick }
              value="Jogar"
            />
          </Link>

          <Link to="/config">
            <Button
              dataTestId="btn-settings"
              value="Configurações"
            />
          </Link>

        </div>
      </div>
    );
  }
}

Login.propTypes = {
  addToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addToken: (payload) => dispatch(setToken(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
