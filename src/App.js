import React from 'react';
import { Route, Switch } from 'react-router';

import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Ranking from './pages/Ranking';
import Score from './pages/Score';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route path="/trivia" component={ Trivia } />
      <Route path="/score" component={ Score } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/config" component={ Config } />
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  );
}
