import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </main>
  );
}
