import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkInputsData = this.checkInputsData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.checkInputsData());
  }

  handleClick() {
    const { email, name } = this.state;
    const { sendLogin } = this.props;

    const data = {
      email,
      name,
    };

    sendLogin(data);
  }

  checkInputsData() {
    let notAllow = 0;
    const { email, name } = this.state;
    const emailArroba = email.split('@');
    if (name.trim() !== '') {
      notAllow += 1;
    }
    if (emailArroba.length === 2 && emailArroba[1].includes('.com')) {
      notAllow += 1;
    }
    if (notAllow === 2) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { name, email, disabled } = this.state;

    return (
      <section>
        <br />
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            id="input-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <label htmlFor="input-email">
          Email:
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="input-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/settings" data-testid="btn-settings">Configurações</Link>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendLogin: (data) => dispatch(loginAction(data)),
  };
}

Login.propTypes = {
  sendLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
