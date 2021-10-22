import React, { Component } from 'react';
// import logo from './trivia.png';
import './App.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/jogo" component={ Game } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/feedback" component={ Feedback } />
        </Switch>
      </div>
    );
  }
}

export default App;
