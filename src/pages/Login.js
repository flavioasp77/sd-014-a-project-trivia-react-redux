/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addUser, getToken } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      settings: false,
      score: 0,
      assertions: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  verify() {
    const { name, email } = this.state;
    const re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (re.test(email) && name.length > 0) {
      return false;
    }
    return true;
  }

  async handleClick() {
    const { actionToken, history, addAction } = this.props;
    addAction(this.state);
    const response = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
    localStorage.setItem('token', response.token);
    const { token } = response;
    await actionToken(token);
    const player = { player: this.state };
    localStorage.setItem('state', JSON.stringify(player));
    history.push('/game');
  }

  render() {
    const { name, email, settings } = this.state;
    if (settings) return <Redirect to="/settings" />;
    return (
      <div
        className="d-flex h-100 align-items-center"
      >
        <div
          className="d-flex flex-column align-items-center
         m-auto p-4 border rounded px-5
         shadow-lg p-3 mb-5 bg-body rounded"
        >
          <label htmlFor="name">
            Nome
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
              className="form-control mb-3"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              name="email"
              className="form-control mb-2"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <div className="d-flex justify-content-around">
            <button
              type="button"
              data-testid="btn-play"
              className="btn btn-success mx-3"
              disabled={ this.verify() }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              className="btn btn-warning mx-3"
              onClick={ () => this.setState({ settings: true }) }
            >
              <i className="fas fa-cog" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionToken: (token) => dispatch(getToken(token)),
  addAction: (state) => dispatch(addUser(state)),
});

Login.propTypes = {
  actionToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf({}).isRequired,
  addAction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
