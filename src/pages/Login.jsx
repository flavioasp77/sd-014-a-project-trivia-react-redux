import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../components/Button';
import Input from '../components/Input';
import Footer from '../components/Footer';
import { setPlayerData } from '../redux/actions';
import opentdbAPI from '../services/opentdbAPI';

import logo from '../trivia.png';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gravatarEmail: '',
      redirect: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    const { dispatchPayload } = this.props;
    const { name, gravatarEmail } = this.state;

    event.preventDefault();
    dispatchPayload({ name, assertions: 0, score: 0, gravatarEmail });

    await opentdbAPI.fetchToken();

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

  render() {
    const { name, gravatarEmail, redirect } = this.state;

    if (redirect) {
      return <Redirect to={ redirect } />;
    }

    return (
      <>
        { this.header() }
        <main>
          <form onSubmit={ this.handleSubmit }>
            <fieldset>
              <h1>Login</h1>
              <Input
                htmlFor="name"
                label="Nome"
                testid="input-player-name"
                onChange={ this.handleChange }
                type="text"
                value={ name }
              />
              <Input
                htmlFor="gravatarEmail"
                label="E-mail"
                testid="input-gravatar-email"
                onChange={ this.handleChange }
                type="text"
                value={ gravatarEmail }
              />
              <Button
                testid="btn-play"
                disabled={ !name.length || !this.validateEmail(gravatarEmail) }
                value="Jogar"
              />
              <Button
                testid="btn-settings"
                value="Configuração"
                onClick={ () => this.setState({ redirect: '/config' }) }
              />
            </fieldset>
          </form>
        </main>
        <Footer />
      </>
    );
  }
}

Login.propTypes = {
  dispatchPayload: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPayload: (payload) => dispatch(setPlayerData(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
