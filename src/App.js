import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
