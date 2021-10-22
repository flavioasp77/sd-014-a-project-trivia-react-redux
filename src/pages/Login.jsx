import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction, triviaApiThuk } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  }

  handleSettingsClick() {
    const { history } = this.props;
    history.push('/settings');
  }

  async handleClick(event) {
    event.preventDefault();
    const { loginSave, tokenTrivia, history } = this.props;
    await loginSave(this.state);
    await tokenTrivia();
    history.push('/jogo');
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, name } = this.state;
    return (
      <>
        <form onSubmit={ this.handleClick }>
          <fieldset>
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
              placeholder="digite seu nome:"
            />
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="digite seu email:"
            />
            <button
              disabled={ !name || !email }
              data-testid="btn-play"
              type="submit"
            >
              Jogar
            </button>
          </fieldset>
        </form>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettingsClick }
        >
          Configurações
        </button>
      </>
    );
  }
}

Login.propTypes = {
  loginSave: PropTypes.func.isRequired,
  tokenTrivia: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginSave: (payload) => dispatch(loginAction(payload)),
  tokenTrivia: () => dispatch(triviaApiThuk()),
});

export default connect(null, mapDispatchToProps)(Login);
