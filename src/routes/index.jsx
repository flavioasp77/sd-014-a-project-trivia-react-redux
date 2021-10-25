import React from 'react';
import { Switch, Route } from 'react-router';
import Feedback from '../pages/Feedback';
import Game from '../pages/Game';
import Login from '../pages/Login';
import Ranking from '../pages/Ranking';
import Settings from '../pages/Settings';

function Routes() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/settings" component={ Settings } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
export default Routes;
