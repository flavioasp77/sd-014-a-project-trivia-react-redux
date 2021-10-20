import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Jogo from './pages/Jogo';

import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Jogo } />
    </Switch>
  );
}

export default App;
