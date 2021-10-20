import React from 'react';
import { Route, Switch } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/trivia" component={ Trivia } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </header>
    </div>
  );
}

// <div className="App">
//      <header className="App-header">
//        <img src={ logo } className="App-logo" alt="logo" />
//        <p>
//          SUA VEZ
//        </p>
//      </header>
//    </div>
