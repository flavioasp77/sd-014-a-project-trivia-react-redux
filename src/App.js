import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Jogo from './pages/Jogo';
import Config from './pages/Config';

import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Jogo } />
      <Route path="/config" component={ Config } />
    </Switch>
  );
}

export default App;
