import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { loginSave } = this.props;
    loginSave(this.state);
  }

  render() {
    const { name, email } = this.state;
    return (
      <form onSubmit={ this.handleClick }>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !name || !email }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  loginSave: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
