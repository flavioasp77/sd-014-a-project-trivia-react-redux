import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import Login from './components/Login';
import Config from './components/Config';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/config" component={ Config } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
