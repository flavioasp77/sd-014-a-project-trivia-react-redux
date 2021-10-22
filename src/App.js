import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Play from './pages/Play';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/play" component={ Play } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
