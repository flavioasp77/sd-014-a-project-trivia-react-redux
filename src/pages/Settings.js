import React, { Component } from 'react';

export default class Settings extends Component {
  render() {
    return (
      <div
        className="h-100 w-100 d-flex justify-content-center
      align-items-center bg-dark"
      >
        <h1 data-testid="settings-title"> Tela de Configuração</h1>
      </div>
    );
  }
}
