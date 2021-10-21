import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Play from './pages/Play';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/play" component={ Play } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
