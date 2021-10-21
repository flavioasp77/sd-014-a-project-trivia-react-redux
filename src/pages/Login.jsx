import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loginUser as loginUserAction,
  fetchGetToken as fetchGetTokenAction,
} from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    const { fetchGetToken } = this.props;
    fetchGetToken();
  }

  onLogin() {
    const { history, loginUser } = this.props;
    loginUser(this.state);
    history.push('/play');
  }

  handleDisabled(name, email) {
    return !(name && email);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
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
            type="button"
            data-testid="btn-play"
            disabled={ this.handleDisabled(name, email) }
            onClick={ this.onLogin }
          >
            Jogar
          </button>
        </form>
        <br />
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchGetToken: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchGetToken: () => dispatch(fetchGetTokenAction()),
  loginUser: (value) => dispatch(loginUserAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);
