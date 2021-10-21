import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import Play from './pages/Play';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/play" component={ Play } />
      </Switch>
    </BrowserRouter>
  );
}
