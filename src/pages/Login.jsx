import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTokenActionThunk } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value }, () => { this.handleValidation(); });
  }

  handleValidation() {
    const { name, email } = this.state;

    if (name && email) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick() {
    const { getToken } = this.props;
    getToken();
  }

  render() {
    const { name, email, disabled } = this.state;
    const { error, message } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
        <Link to="/configuration">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
        { error && <p>{`Erro: ${message} - tente novamente`}</p>}
      </div>
    );
  }
}

Login.propTypes = {
  error: PropTypes.bool.isRequired,
  getToken: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.triviaReducer.error,
  message: state.triviaReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenActionThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
