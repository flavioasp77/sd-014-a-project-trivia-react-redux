import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Jogo from './pages/Jogo';

export default function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Jogo } />
      </Switch>
    </main>
  );
}
