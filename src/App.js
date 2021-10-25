import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Play from './pages/Play';
import Ranking from './pages/Ranking';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/play" component={ Play } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
export default App;
