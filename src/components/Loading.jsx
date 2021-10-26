import React, { Component } from 'react';
import '../style/loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <span>Carregando...</span>
      </div>
    );
  }
}
