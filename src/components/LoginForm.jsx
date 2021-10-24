import React, { Component } from 'react';

export class LoginForm extends Component {
  render() {
    return (
      <form className="card-login">
        <h3>Nome Do Jogador:</h3>
        <input
          className="input-login input-name"
          placeholder="Name:"
          value={ name }
          onChange={ this.handleInput }
          type="text"
          name="name"
          data-testid="input-player-name"
        />
        <h3>Email Do Gravatar:</h3>
        <input
          placeholder="Email:"
          className="input-login"
          value={ email }
          onChange={ this.handleInput }
          type="text"
          name="email"
          data-testid="input-gravatar-email"
        />
        <button
          className={ !this.btnJogar() ? 'btn-jogar-desab' : 'btn-jogar' }
          type="button"
          data-testid="btn-play"
          disabled={ !this.btnJogar() }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <button
          className="btn-config"
          data-testid="btn-settings"
          type="button"
          onClick={ () => history.push('/settings') }
        >
          configuração do jogo
        </button>
      </form>
    );
  }
}

export default LoginForm;
