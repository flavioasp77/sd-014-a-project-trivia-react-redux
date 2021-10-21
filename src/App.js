import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}
