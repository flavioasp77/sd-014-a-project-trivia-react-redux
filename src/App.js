import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Config from './pages/Config';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import RankingPlayer from './pages/Ranking';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/config" component={ Config } />
      <Route path="/jogo" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ RankingPlayer } />
    </Switch>
  );
}

export default App;
