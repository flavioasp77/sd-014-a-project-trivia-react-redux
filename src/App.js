import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Jogo } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
