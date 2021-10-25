import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Rankings from './pages/Rankings';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/game" component={ Game } />
        <Route path="/rankings" component={ Rankings } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
