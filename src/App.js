import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Config from './pages/Config';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/config" component={ Config } />
      <Route path="/jogo" component={ Game } />
    </Switch>
  );
}

export default App;
