import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import { createPlayer } from '../redux/actions';
import '../styles/Login.css';

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
    document.title = 'Trivia-Login';
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { email, name } = this.state;
    const { dispatchCreatePlayer } = this.props;
    dispatchCreatePlayer(name, email);
  }

  emailValidation() {
    const { email } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(String(email).toLowerCase());
  }

  render() {
    const { name, email } = this.state;
    const MIN_CARACTER = 2;
    return (
      <main className="login">
        <Input
          name="name"
          msg="Nome"
          value={ name }
          onChange={ this.handleChange }
          dataTestid="input-player-name"
        />
        <Input
          name="email"
          msg="Email"
          value={ email }
          onChange={ this.handleChange }
          dataTestid="input-gravatar-email"
        />
        <Link to="/game">
          <Button
            label="Jogar"
            onClick={ this.handleClick }
            isDisabled={ !(this.emailValidation()) || name.length < MIN_CARACTER }
            dataTestid="btn-play"
          />
        </Link>
        <Link to="/settings">
          <Button
            label="Configurações"
            dataTestid="btn-settings"
          />
        </Link>
      </main>
    );
  }
}

Login.propTypes = {
  dispatchCreatePlayer: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreatePlayer: (name, email) => dispatch(createPlayer(name, email)),
  };
}

export default connect(null, mapDispatchToProps)(Login);
