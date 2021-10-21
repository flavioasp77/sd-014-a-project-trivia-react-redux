import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Play from './pages/Play';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/play" component={ Play } />
      </Switch>
    );
  }
}

export default App;
