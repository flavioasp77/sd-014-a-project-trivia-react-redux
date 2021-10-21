import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exatch path="/" component={ Login } />
        <Route exatch path="/game" component={ Game } />
      </Switch>
    );
  }
}
