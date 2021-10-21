import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Play from './pages/Play';
import Config from './pages/Config';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/play" component={ Play } />
          <Route exact path="/config" component={ Config } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
