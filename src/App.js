import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/Trivia" component={ Trivia } />
      </Switch>
    </div>
  );
}
