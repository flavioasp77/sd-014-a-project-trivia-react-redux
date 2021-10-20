import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exatch path="/" component={ LoginPage } />
      </Switch>
    );
  }
}
