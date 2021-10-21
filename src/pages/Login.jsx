import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../components/Button';
import Input from '../components/Input';
import { setUserData } from '../redux/actions';
import opentdbAPI from '../services/opentdbAPI';

import logo from '../trivia.png';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      redirect: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const { dispatchPayload } = this.props;
    const { name, email } = this.state;

    event.preventDefault();
    dispatchPayload({ name, email });

    opentdbAPI.fetchToken();

    this.setState({ redirect: '/trivia' });
  }

  validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  }

  header() {
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
    );
  }

  footer() {
    return (
      <footer>
        <p>
          Projeto Trivia React Redux, Grupo 5, Turma 14-A
          <br />
          Augusto Raminelli, Daniel Custódio, Gustavo Dias, Marcello Alves, Victor Varges
        </p>
      </footer>
    );
  }

  render() {
    const { name, email, redirect } = this.state;

    if (redirect) {
      return <Redirect to={ redirect } />;
    }

    return (
      <>
        { this.header() }
        <main>
          <form onSubmit={ this.handleSubmit }>
            <fieldset>
              <h1>THIS IS LOGIN</h1>
              <Input
                htmlFor="name"
                label="Nome"
                testid="input-player-name"
                onChange={ this.handleChange }
                type="text"
                value={ name }
              />
              <Input
                htmlFor="email"
                label="E-mail"
                testid="input-gravatar-email"
                onChange={ this.handleChange }
                type="text"
                value={ email }
              />
              <Button
                testid="btn-play"
                disabled={ !name.length || !this.validateEmail(email) }
                value="Jogar"
              />
            </fieldset>
          </form>
        </main>
        { this.footer() }
      </>
    );
  }
}

Login.propTypes = {
  dispatchPayload: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPayload: (payload) => dispatch(setUserData(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
