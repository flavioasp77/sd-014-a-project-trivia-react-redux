import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';

import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Game } />
    </Switch>
  );
}

export default App;
