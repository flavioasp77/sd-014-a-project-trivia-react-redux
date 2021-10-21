import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addLoginUser, fetchGetToken } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfigBtn = this.handleConfigBtn.bind(this);

    this.state = {
      email: '',
      name: '',
    };
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleDisabled(name, email) {
    return !(name && email);
  }

  handleConfigBtn() {
    const { history } = this.props;
    history.push('/config');
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userLogin, fetchToken } = this.props;
    fetchToken();
    userLogin(this.state);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              id="name"
              value={ name }
              name="name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ this.handleDisabled(name, email) }
          >
            Jogar

          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfigBtn }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (value) => dispatch(addLoginUser(value)),
  fetchToken: () => dispatch(fetchGetToken()),
});

export default connect(null, mapDispatchToProps)(Login);
