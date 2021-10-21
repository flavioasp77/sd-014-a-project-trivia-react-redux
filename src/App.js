import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
      <Trivia />
    </div>
  );
}
