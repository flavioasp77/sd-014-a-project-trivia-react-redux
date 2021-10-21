import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUserInfo } from '../redux/actions/index';

import { getTriviaToken } from '../services/triviaAPI';
import { savePlayerLocal } from '../services/playerInfo';

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

  async handleClick() {
    const { name, email } = this.state;
    const { saveUser, history } = this.props;
    saveUser({ name, email });
    await getTriviaToken();
    savePlayerLocal(name, 0, 0, email);
    history.push('/trivia');
  }

  showButtons() {
    return (
      <div className="d-flex justify-content-center">
        <button
          type="button"
          disabled={ this.checkInputs() }
          onClick={ this.handleClick }
          className="mx-2 btn btn-dark"
          data-testid="btn-play"
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          className="mx-2 btn btn-dark"
        >
          <Link to="/settings">&#128295;</Link>
        </button>
      </div>
    );
  }

  showInputs() {
    const { name, email } = this.state;
    return (
      <>
        <div className="mb-3 align-self-center lg-inp">
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
        <div className="mb-3 align-self-center lg-inp">
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
      </>
    );
  }

  render() {
    return (
      <form className="main-login">
        <div className="login-container">
          <div
            className="my-5 align-self-center main-title"
          >
            Slumdog Milionaire
          </div>
          <div>
            { this.showInputs() }
          </div>
          <div>
            { this.showButtons() }
          </div>
        </div>
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
