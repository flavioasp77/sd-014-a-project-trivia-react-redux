import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Login from './pages/login';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Config } />
      <Route path="/trivia" component={ Trivia } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
