import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserInfo } from '../redux/actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.checkInputs();
  }

  checkInputs() {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      return false;
    }
    return true;
  }

  handleClick() {
    const { name, email } = this.state;
    const { saveUser } = this.props;

    saveUser({ name, email });
  }

  render() {
    const { name, email } = this.state;
    return (
      <form>
        <div className="mb-3">
          <label htmlFor="email">
            Type in your best e-mail
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              placeholder="name@example.com"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="name">
            Choose a nice Screen Name
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
        </div>
        <button
          type="button"
          disabled={ this.checkInputs() }
          onClick={ this.handleClick }
          className="btn btn-dark"
          data-testid="btn-play"
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (payload) => dispatch(saveUserInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
};
