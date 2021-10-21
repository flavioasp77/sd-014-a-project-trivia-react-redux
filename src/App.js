import React from 'react';
import { Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header> */}
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
    </div>
  );
}
