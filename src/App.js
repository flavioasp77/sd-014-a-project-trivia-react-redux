import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { } from 'react-redux';

import { Home, ConfigPage, GamePage, FeedbackPage, RankingPage } from './pages';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Home history={ props.history } /> } />
      <Route path="/configurations" component={ ConfigPage } />
      <Route path="/game" component={ GamePage } />
      <Route path="/feedback" component={ FeedbackPage } />
      <Route path="/ranking" component={ RankingPage } />
    </Switch>
  );
}
