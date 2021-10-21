import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
      </Switch>
    );
  }
}

export default App;
