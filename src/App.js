import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Configs from './pages/Configs';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Configs } />
      <Route path="/game" render={ (props) => <Game { ...props } /> } />
      <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
    </Switch>
  );
}
